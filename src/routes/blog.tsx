import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import blogHero from "@/assets/blog-hero.jpg";
import blogTraining from "@/assets/blog-training.jpg";
import blogAi from "@/assets/blog-ai.jpg";
import blogCybersecurity from "@/assets/blog-cybersecurity.jpg";
import blogCloud from "@/assets/blog-cloud.jpg";
import blogFreelancing from "@/assets/blog-freelancing.jpg";
import blogMobile from "@/assets/blog-mobile.jpg";
import {
  Calendar, Clock, User, ArrowRight, Search,
  Tag, ChevronRight, MessageCircle, Eye,
} from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/hooks/use-scroll-animation";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Euspan Solutions | Tech Insights & Digital Skills" },
      { name: "description", content: "Stay updated with the latest in technology, digital skills, cybersecurity, AI, cloud computing, and freelancing tips from Euspan Solutions." },
      { property: "og:title", content: "Blog — Euspan Solutions" },
      { property: "og:description", content: "Tech insights, digital training tips, and industry news from Euspan Solutions Kenya." },
    ],
  }),
  component: BlogPage,
});

const categories = [
  "All",
  "Digital Skills",
  "AI & Innovation",
  "Cybersecurity",
  "Cloud Computing",
  "Freelancing",
  "Software Dev",
];

const blogPosts = [
  {
    id: 1,
    title: "Why Digital Skills Training is the Key to Reducing Youth Unemployment in Kenya",
    excerpt: "Kenya's youth unemployment rate remains a critical challenge. At Euspan Solutions, we believe that equipping young people with practical digital skills is the most effective pathway to meaningful employment and self-reliance in the modern economy.",
    image: blogTraining,
    category: "Digital Skills",
    author: "Euspan Team",
    date: "April 10, 2026",
    readTime: "6 min read",
    views: 1240,
    comments: 18,
    featured: true,
  },
  {
    id: 2,
    title: "How Artificial Intelligence is Transforming Business Operations in East Africa",
    excerpt: "From automated customer service to predictive analytics, AI is no longer a futuristic concept — it's here and reshaping how businesses operate across East Africa. Learn how Euspan Solutions is helping businesses adopt AI tools.",
    image: blogAi,
    category: "AI & Innovation",
    author: "Euspan Team",
    date: "April 5, 2026",
    readTime: "8 min read",
    views: 980,
    comments: 12,
    featured: true,
  },
  {
    id: 3,
    title: "Top 10 Cybersecurity Threats Every Kenyan Business Should Know About in 2026",
    excerpt: "Cyber threats are evolving faster than ever. Small and medium businesses in Kenya are increasingly targeted. Here's what you need to know to protect your business data and digital assets from the most common attacks.",
    image: blogCybersecurity,
    category: "Cybersecurity",
    author: "Euspan Team",
    date: "March 28, 2026",
    readTime: "7 min read",
    views: 1560,
    comments: 24,
  },
  {
    id: 4,
    title: "Getting Started with Cloud Computing: A Beginner's Guide for African Businesses",
    excerpt: "Cloud computing offers scalability, cost savings, and flexibility. Whether you're a startup or an established enterprise, migrating to the cloud can transform your operations. Here's how to get started the right way.",
    image: blogCloud,
    category: "Cloud Computing",
    author: "Euspan Team",
    date: "March 20, 2026",
    readTime: "5 min read",
    views: 720,
    comments: 9,
  },
  {
    id: 5,
    title: "How to Start Freelancing Online: A Step-by-Step Guide for Kenyan Youth",
    excerpt: "Freelancing has opened doors for thousands of young Kenyans to earn a living from home. From choosing the right platform to building your portfolio, this guide covers everything you need to start your freelancing journey.",
    image: blogFreelancing,
    category: "Freelancing",
    author: "Euspan Team",
    date: "March 15, 2026",
    readTime: "10 min read",
    views: 2100,
    comments: 35,
  },
  {
    id: 6,
    title: "Building Your First Mobile App: Tools, Tips & Best Practices for Beginners",
    excerpt: "Mobile app development is one of the most in-demand skills today. Whether you want to build for Android or iOS, this article covers the essential tools, frameworks, and best practices to get you started.",
    image: blogMobile,
    category: "Software Dev",
    author: "Euspan Team",
    date: "March 8, 2026",
    readTime: "9 min read",
    views: 890,
    comments: 15,
  },
];

const recentPosts = blogPosts.slice(0, 4);

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured || activeCategory !== "All");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={blogHero} alt="Euspan Blog" className="absolute inset-0 w-full h-full object-cover" width={1920} height={640} />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <AnimatedSection animation="fade-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Our Blog</p>
            <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl md:text-6xl">
              Insights & Resources
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Stay updated with the latest in technology, digital skills, cybersecurity, AI, and freelancing — empowering you with knowledge to succeed in the digital economy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="border-b border-border bg-card sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts (only on "All") */}
      {activeCategory === "All" && searchQuery === "" && (
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4">
            <AnimatedSection animation="fade-up">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
                <span className="text-gradient-blue">Featured</span> Articles
              </h2>
            </AnimatedSection>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post, i) => (
                <AnimatedSection key={post.id} animation={i === 0 ? "fade-right" : "fade-left"} delay={i * 200}>
                  <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        width={800}
                        height={512}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <Tag className="h-3 w-3" /> {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {post.views}</span>
                          <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {post.comments}</span>
                        </div>
                      </div>
                      <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                        Read More <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Posts */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="fade-up">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
                  {activeCategory === "All" ? "Latest" : activeCategory} Articles
                </h2>
              </AnimatedSection>

              {(activeCategory === "All" && searchQuery === "" ? regularPosts.length === 0 ? blogPosts : regularPosts : filteredPosts).length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-medium text-foreground">No articles found</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or category filter.</p>
                </div>
              ) : (
                <div className="space-y-6">
                    {(activeCategory === "All" && searchQuery === "" ? blogPosts.filter(p => !p.featured) : filteredPosts).map((post, idx) => (
                      <AnimatedSection key={post.id} animation="fade-up" delay={idx * 100}>
                      <article
                        className="group flex flex-col sm:flex-row gap-5 rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-lg transition-all duration-300"
                      >
                        <div className="sm:w-64 sm:flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            width={800}
                            height={512}
                            className="h-48 sm:h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1 py-1">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <Tag className="h-3 w-3" /> {post.category}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {post.date}
                              </span>
                            </div>
                            <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                              <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {post.views}</span>
                              <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {post.comments}</span>
                            </div>
                            <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                              Read <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </article>
                      </AnimatedSection>
                    ))}
                  </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* About Widget */}
              <AnimatedSection animation="fade-left">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">About This Blog</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Euspan Solutions blog covers technology insights, digital skills training, cybersecurity tips, AI innovation, and career guidance to empower individuals in the digital economy.
                  </p>
                  <Link to="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                    Learn About Us <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>

              {/* Categories Widget */}
              <AnimatedSection animation="fade-left" delay={100}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.filter(c => c !== "All").map((cat) => {
                      const count = blogPosts.filter(p => p.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <ChevronRight className="h-3.5 w-3.5 text-primary" />
                            {cat}
                          </span>
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>

              {/* Recent Posts Widget */}
              <AnimatedSection animation="fade-left" delay={200}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="group flex gap-3 cursor-pointer">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          width={80}
                          height={60}
                          className="h-16 w-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {post.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Newsletter Widget */}
              <AnimatedSection animation="fade-left" delay={300}>
                <div className="rounded-2xl bg-gradient-hero p-6 shadow-card">
                  <h3 className="font-heading text-lg font-bold text-primary-foreground mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-sm text-primary-foreground/70 mb-4">
                    Get the latest tech insights, training updates, and career tips delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button className="w-full rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Tags Widget */}
              <AnimatedSection animation="fade-left" delay={400}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Digital Skills", "AI", "Cybersecurity", "Cloud", "Freelancing", "Web Dev", "Mobile Apps", "Kenya Tech", "Career", "Training", "Innovation", "E-commerce"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection animation="fade-up">
        <section className="bg-gradient-hero py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
              Want to Learn More?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join our certified digital training programs and start your journey in the tech industry today.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/departments"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all"
              >
                Explore Our Programs <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
