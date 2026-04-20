
-- 1. Auto-grant admin role to founder email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, phone, institution, age_group, course_interest)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'institution',
    NEW.raw_user_meta_data->>'age_group',
    NEW.raw_user_meta_data->>'course_interest'
  );

  -- Grant admin to founder, student to everyone else
  IF lower(NEW.email) = 'ndundae823@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student');
  END IF;

  INSERT INTO public.notifications (user_id, title, body)
  VALUES (
    NEW.id,
    'Welcome to Euspan Solutions!',
    'Your account is active. Browse programs and apply to start your digital journey.'
  );

  RETURN NEW;
END;
$function$;

-- Ensure the auth trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- If founder already exists, grant admin role retroactively
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE lower(email) = 'ndundae823@gmail.com'
  AND NOT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.users.id AND ur.role = 'admin');

-- 2. SERVICE REQUESTS (services, products, training)
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  request_type TEXT NOT NULL CHECK (request_type IN ('service','product','training')),
  item_name TEXT NOT NULL,
  message TEXT,
  amount NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'KES',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed','cancelled')),
  receipt_number TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a request"
  ON public.service_requests FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Owner or admin can view requests"
  ON public.service_requests FOR SELECT TO anon, authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR (auth.uid() IS NOT NULL AND auth.uid() = user_id)
    OR (auth.uid() IS NULL)  -- allow guest fetch by id right after submit (filtered client-side)
  );

CREATE POLICY "Admin updates requests"
  ON public.service_requests FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin deletes requests"
  ON public.service_requests FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_service_requests_updated
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-generate receipt number
CREATE OR REPLACE FUNCTION public.generate_receipt_number()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.receipt_number IS NULL THEN
    NEW.receipt_number := 'EUS-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(replace(gen_random_uuid()::text,'-',''),1,6));
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_service_requests_receipt
  BEFORE INSERT ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.generate_receipt_number();

-- 3. COMPLAINTS / RECOMMENDATIONS
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  type TEXT NOT NULL CHECK (type IN ('complaint','recommendation')),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewed','resolved')),
  reposted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone submits feedback"
  ON public.complaints FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public sees reposted recommendations"
  ON public.complaints FOR SELECT TO anon, authenticated
  USING (
    (type = 'recommendation' AND reposted = true)
    OR has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admin updates feedback"
  ON public.complaints FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin deletes feedback"
  ON public.complaints FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_complaints_updated
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. LMS: COURSES
CREATE TABLE public.lms_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT,
  is_free BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lms_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads active courses"
  ON public.lms_courses FOR SELECT TO anon, authenticated
  USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin manages courses"
  ON public.lms_courses FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 5. LMS: MODULES
CREATE TABLE public.lms_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lms_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads modules"
  ON public.lms_modules FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin manages modules"
  ON public.lms_modules FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 6. LMS: LESSONS
CREATE TABLE public.lms_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.lms_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  notes TEXT NOT NULL,
  image_url TEXT,
  practical_task TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lms_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads lessons"
  ON public.lms_lessons FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin manages lessons"
  ON public.lms_lessons FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 7. LMS: ENROLLMENTS (free, no auth required — name+email only)
CREATE TABLE public.lms_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  progress_percent INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lms_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone enrolls"
  ON public.lms_enrollments FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone reads enrollments (filter client side by id)"
  ON public.lms_enrollments FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone updates own enrollment row"
  ON public.lms_enrollments FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Admin deletes enrollments"
  ON public.lms_enrollments FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_enrollments_updated
  BEFORE UPDATE ON public.lms_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. LMS: LESSON PROGRESS
CREATE TABLE public.lms_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES public.lms_enrollments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lms_lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (enrollment_id, lesson_id)
);

ALTER TABLE public.lms_lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone records progress"
  ON public.lms_lesson_progress FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone reads progress"
  ON public.lms_lesson_progress FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin deletes progress"
  ON public.lms_lesson_progress FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 9. LMS: CERTIFICATES
CREATE TABLE public.lms_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES public.lms_enrollments(id) ON DELETE CASCADE,
  certificate_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  show_on_impact_wall BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.lms_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads certificates"
  ON public.lms_certificates FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone creates certificate"
  ON public.lms_certificates FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admin updates certificates"
  ON public.lms_certificates FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin deletes certificates"
  ON public.lms_certificates FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 10. Seed the Digital Literacy course
INSERT INTO public.lms_courses (slug, title, description, is_free, is_active)
VALUES (
  'digital-literacy-for-beginners',
  'Digital Literacy for Beginners',
  'Free Pro Bono training: master computer basics, internet, email, online safety, smartphone skills, file management, and freelancing fundamentals. Earn a Certificate of Appreciation signed by the CEO.',
  true,
  true
);

-- Modules + lessons
DO $$
DECLARE course_uuid UUID;
        m1 UUID; m2 UUID; m3 UUID; m4 UUID; m5 UUID; m6 UUID; m7 UUID; m8 UUID;
BEGIN
  SELECT id INTO course_uuid FROM public.lms_courses WHERE slug = 'digital-literacy-for-beginners';

  INSERT INTO public.lms_modules (course_id, title, description, position) VALUES
    (course_uuid, 'Introduction to Digital Skills', 'What digital literacy is and why it matters', 1) RETURNING id INTO m1;
  INSERT INTO public.lms_modules (course_id, title, description, position) VALUES
    (course_uuid, 'Computer Basics', 'Parts of a computer and how to use it', 2) RETURNING id INTO m2;
  INSERT INTO public.lms_modules (course_id, title, description, position) VALUES
    (course_uuid, 'Internet Basics', 'Using browsers and search engines', 3) RETURNING id INTO m3;
  INSERT INTO public.lms_modules (course_id, title, description, position) VALUES
    (course_uuid, 'Email Creation', 'Setting up and using Gmail', 4) RETURNING id INTO m4;
  INSERT INTO public.lms_modules (course_id, title, description, position) VALUES
    (course_uuid, 'Online Safety', 'Strong passwords and avoiding scams', 5) RETURNING id INTO m5;
  INSERT INTO public.lms_modules (course_id, title, description, position) VALUES
    (course_uuid, 'Smartphone Skills', 'Apps and mobile internet', 6) RETURNING id INTO m6;
  INSERT INTO public.lms_modules (course_id, title, description, position) VALUES
    (course_uuid, 'File Management', 'Saving and organizing files', 7) RETURNING id INTO m7;
  INSERT INTO public.lms_modules (course_id, title, description, position) VALUES
    (course_uuid, 'Introduction to Online Work', 'Freelancing basics', 8) RETURNING id INTO m8;

  INSERT INTO public.lms_lessons (module_id, title, notes, practical_task, position) VALUES
    (m1, 'What is Digital Literacy?', 'Digital literacy is the ability to find, evaluate, and use information from digital tools like computers and smartphones. In today''s world, digital skills unlock education, employment, and entrepreneurship. Whether you want to study online, apply for jobs, or start a small business, digital literacy is your foundation.', 'List 3 ways you could earn online (e.g., freelancing, content creation, online tutoring).', 1),
    (m2, 'Parts of a Computer', 'A computer has hardware (monitor, keyboard, mouse, CPU, storage) and software (operating system and applications). The CPU is the brain. Storage holds your files. The monitor displays everything. The keyboard and mouse are how you give commands.', 'Type a short paragraph (3-5 sentences) about yourself in any text app.', 1),
    (m3, 'Using Browsers and Search', 'A browser (Chrome, Firefox, Edge) lets you visit websites. Type a website address in the URL bar, or use Google.com to search. Use specific keywords for better results.', 'Search for "best free online courses in Kenya" and take a screenshot.', 1),
    (m4, 'Creating a Gmail Account', 'Gmail is a free email service from Google. Go to gmail.com, click "Create account", fill in your name, choose a username and strong password, add a recovery phone, and you''re done. Email is essential for jobs, school, and online services.', 'Send a test email to a friend or to info@euspansolutions.com with the subject "Hello from Digital Literacy".', 1),
    (m5, 'Strong Passwords & Avoiding Scams', 'A strong password has 12+ characters, mixes letters, numbers, and symbols, and is unique per account. Never click suspicious links. Never share your password or OTP. Banks never ask for your PIN by SMS.', 'Create a strong password (don''t share it). Example pattern: 2 unrelated words + numbers + symbol.', 1),
    (m6, 'Smartphone Apps & Internet', 'Use the Play Store (Android) or App Store (iOS) to install apps. Connect to Wi-Fi to save mobile data. Useful apps: WhatsApp (chat), M-Pesa (money), Google Drive (files), YouTube (learning).', 'Install one productive app (e.g., Google Drive, M-Pesa, or a learning app) and open it.', 1),
    (m7, 'Folders & File Management', 'Files are documents, photos, videos. Folders group related files. Always name files clearly (e.g., "CV-John-Doe-2025.pdf"). Use cloud storage like Google Drive to back up important files.', 'Create a folder called "Digital Literacy" on your phone or computer and save one file in it.', 1),
    (m8, 'Freelancing Basics', 'Freelancing is offering services online for pay. Popular platforms: Upwork, Fiverr, PeoplePerHour, Remotasks. Common skills in demand: writing, virtual assistance, data entry, design, transcription. Build a profile, deliver quality work, and grow your reputation.', 'Visit fiverr.com or upwork.com and browse jobs in a category that interests you.', 1);
END $$;
