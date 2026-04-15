import { useEffect, useRef, useState, type RefObject } from "react";

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  const baseStyles = "transition-all duration-700 ease-out";
  const delayStyle = { transitionDelay: `${delay}ms` };

  const animationMap = {
    "fade-up": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8",
    "fade-left": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-8",
    "fade-right": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-8",
    scale: isVisible
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95",
    fade: isVisible ? "opacity-100" : "opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${animationMap[animation]} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 100,
  animation = "fade-up",
}: {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  animation?: AnimatedSectionProps["animation"];
}) {
  return (
    <>
      {children.map((child, i) => (
        <AnimatedSection
          key={i}
          className={className}
          animation={animation}
          delay={i * staggerDelay}
        >
          {child}
        </AnimatedSection>
      ))}
    </>
  );
}
