"use client";

import React, { useState } from "react";
import {
  Palette,
  Mail,
  User,
  Phone,
  Send,
  Play,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Laptop,
  Smartphone,
  ShoppingBag,
  Layers,
  Wrench,
  Bot,
} from "lucide-react";
import Navigation from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        if (typeof window !== "undefined" && window.ttq) {
          window.ttq.track("SubmitForm", {
            content_name: "Consultation Request",
            value: 0,
            currency: "USD",
          });
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <Laptop className="w-8 h-8 text-white" />,
      title: "Web Development",
      description:
        "Custom, responsive, and high-performance websites built to strengthen your online presence and deliver measurable results.",
      color: "#4A90E2",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: "Mobile App Development",
      description:
        "Feature-rich Android and iOS applications designed to provide seamless user experiences and support business growth.",
      color: "#FDB913",
    },
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "UI/UX Design",
      description:
        "Modern, user-centered interfaces that are visually engaging, easy to navigate, and optimized for higher conversions.",
      color: "#88B9E6",
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: "E-commerce Development",
      description:
        "Secure and scalable online stores that make selling products simple while delivering an outstanding shopping experience.",
      color: "#4A90E2",
    },
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Branding & Graphic Design",
      description:
        "Create a memorable brand identity with professional logos, visual assets, and marketing materials that leave a lasting impression.",
      color: "#FDB913",
    },
    {
      icon: <Wrench className="w-8 h-8 text-white" />,
      title: "Website Maintenance & Support",
      description:
        "Keep your website secure, updated, and performing at its best with ongoing maintenance and technical support.",
      color: "#88B9E6",
    },
    {
      icon: <Bot className="w-8 h-8 text-white" />,
      title: "AI Automation",
      description:
        "Streamline your operations and increase business efficiency with cutting-edge artificial intelligence and smart workflow automation.",
      color: "#4A90E2",
    },
  ];

  const portfolio = [
    {
      title: "Corporate Business Website",
      category: "Corporate Web",
      description:
        "A premium corporate platform engineered for conversions, featuring interactive components and responsive interfaces.",
      stats: "150% Lead Growth",
      color: "#4A90E2",
    },
    {
      title: "E-commerce Platform",
      category: "Digital Storefront",
      description:
        "A secure, scalable e-commerce site with integrated payment pipelines and search optimization.",
      stats: "30% Sales Boost",
      color: "#FDB913",
    },
    {
      title: "Mobile Banking App",
      category: "Fintech Mobile",
      description:
        "A feature-rich banking application built for secure, seamless mobile transactions on both iOS and Android.",
      stats: "99.9% Uptime",
      color: "#88B9E6",
    },
    {
      title: "Healthcare Management System",
      category: "Enterprise System",
      description:
        "An intuitive clinic dashboard streamlining patient schedules, electronic records, and staff communication.",
      stats: "40% Time Saved",
      color: "#4A90E2",
    },
    {
      title: "Real Estate Listing Platform",
      category: "Web Application",
      description:
        "A modern portal showcasing property listings with advanced filters, maps, and virtual tour options.",
      stats: "50k+ Active Users",
      color: "#FDB913",
    },
    {
      title: "School Management Portal",
      category: "SaaS Platform",
      description:
        "An educational dashboard facilitating grading, remote learning assignments, and parent notifications.",
      stats: "10k+ Students",
      color: "#88B9E6",
    },
  ];

  const testimonials = [
    {
      name: "Sarah A.",
      role: "Business Owner",
      content:
        "Web3Nova exceeded our expectations. They delivered a beautiful website that significantly improved our online presence.",
      avatar: "SA",
      color: "#4A90E2",
    },
    {
      name: "Michael O.",
      role: "Startup Founder",
      content:
        "Professional, responsive, and highly skilled. Our mobile app was delivered on time and performs flawlessly.",
      avatar: "MO",
      color: "#FDB913",
    },
  ];

  return (
    <>
      <Navigation />

      {/* Spacing for fixed navbar */}
      <div className="h-20 md:h-24"></div>

      {/* Section 1: Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center z-10">
        <div className="inline-block px-4 py-1.5 rounded-full mb-6 bg-blue-500/10 border border-blue-500/20">
          <span
            className="text-blue-400 font-semibold text-sm tracking-wide uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            ✦ Next-Gen Digital Agency
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] max-w-5xl"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Build Powerful Digital Experiences That{" "}
          <span className="bg-gradient-to-r from-blue-400 via-[#92B4E4] to-yellow-400 bg-clip-text text-transparent">
            Drive Business Growth
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mb-4 leading-relaxed font-light">
          From stunning websites to intuitive mobile apps, we create scalable digital solutions tailored to your business goals. At Web3Nova, we combine strategy, design, and technology to help brands stand out, engage customers, and grow with confidence.
        </p>

        <p className="text-blue-400 text-lg md:text-xl font-semibold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Let&apos;s build something exceptional together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none px-4 sm:px-0">
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span>View Our Services</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            View Portfolio
          </a>
        </div>
      </section>

      {/* Section 2: Services */}
      <section id="services" className="relative py-24 px-6 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              We offer comprehensive digital engineering and creative design services tailored to scale your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-3xl p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.03] overflow-hidden flex flex-col justify-between"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top left, ${service.color}15, transparent 70%)`,
                  }}
                />
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  style={{ backgroundColor: service.color }}
                >
                  {service.icon}
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3 relative z-10"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm relative z-10 mb-6">
                  {service.description}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 relative z-10 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                  <a
                    href="#testimonials"
                    className="inline-flex items-center gap-1 text-xs font-bold transition-all hover:underline"
                    style={{ color: service.color, fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    <span>What our customers say</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#consultation"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 border border-white/10 hover:bg-white/5"
                    style={{ color: "#ffffff", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    <span>Book Consultation</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20 max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10">
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Why choose{" "}
              <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                Web3Nova?
              </span>
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              We deliver innovative, reliable, and scalable digital solutions that help businesses improve efficiency, enhance customer experience, and achieve long-term success.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Portfolio/Case Studies */}
      <section id="portfolio" className="relative py-24 px-6 border-t border-white/5 bg-black/20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Our Work{" "}
                <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                  Speaks for Itself
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl">
                Explore a selection of projects we&apos;ve delivered for startups, businesses, and organizations across different industries.
              </p>
            </div>
            <a
              href="/services"
              className="mt-4 md:mt-0 text-blue-400 hover:text-blue-300 font-bold inline-flex items-center gap-1 group"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span>Explore services page</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-3xl p-8 bg-[#0c0c12] border border-white/5 hover:border-white/15 transition-all duration-500 flex flex-col justify-between h-[320px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: `${project.color}15`,
                        color: project.color,
                      }}
                    >
                      {project.category}
                    </span>
                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Metrics</span>
                  <span className="text-white font-bold text-sm" style={{ color: project.color }}>
                    {project.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm italic">
              Each project highlights the challenge, our solution, and the measurable results achieved.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Social Proof */}
      <section id="testimonials" className="relative py-24 px-6 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Trusted by Businesses That{" "}
              <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                Value Quality
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              See what our clients say about partnering with Web3Nova.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Testimonials */}
            <div className="space-y-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl p-8 bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10"
                >
                  <p className="text-gray-300 italic text-base mb-6 leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {t.name}
                      </h4>
                      <p className="text-gray-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Video Placeholder Widget */}
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-4 shadow-2xl">
              <div className="mb-6 px-2">
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Client Success Stories
                </h3>
                <p className="text-gray-400 text-sm">
                  Watch short video testimonials from satisfied clients sharing their experience working with Web3Nova.
                </p>
              </div>

              <div className="aspect-video bg-[#0a0a0f] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                {/* Simulated Wave Effects */}
                <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-mono">
                    Success Stream
                  </span>
                </div>

                {isVideoPlaying ? (
                  <div className="text-center p-6">
                    <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-bounce" />
                    <p className="text-white font-bold mb-1">Playing Web3Nova Case Study</p>
                    <p className="text-gray-500 text-xs">Simulated review stream...</p>
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="mt-4 text-xs text-blue-400 hover:underline"
                    >
                      Stop video
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-20 h-20 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-115 relative z-10 shadow-lg shadow-blue-500/50"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </button>
                    <span className="text-xs text-gray-500 mt-4 relative z-10">
                      Watch Video Testimonial (2 min)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Consultation Form */}
      <section id="consultation" className="relative py-24 px-6 border-t border-white/5 bg-transparent z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full mb-4 bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400 font-semibold text-xs uppercase tracking-wider">
                ✦ Zero Cost
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Book a Free{" "}
              <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                Consultation
              </span>
            </h2>
            <p className="text-white text-xl font-semibold mb-2">
              Ready to build your next digital product? Get in touch with us.
            </p>
            <p className="text-gray-400 text-base">
              Complete the form below and our team will contact you within 24 hours.
            </p>
          </div>

          <div className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="text-gray-400">
                  Our development leads will contact you at your email or phone within 2 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 text-xs text-gray-500 hover:text-white underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-gray-400 text-sm mb-2 font-medium">(Optional) Tell us about your project</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe what you're building..."
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  <span>{isSubmitting ? "Scheduling..." : "Schedule My Free Consultation"}</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section 6: Bottom Call to Action */}
      <section className="relative py-32 px-6 border-t border-white/5 bg-transparent z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Ready to build your next{" "}
            <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
              digital product?
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Get in touch with us. Complete the consultation form above and our team will contact you within 24 hours.
          </p>

          <a
            href="#consultation"
            className="inline-flex items-center gap-3 px-12 py-5 text-lg font-bold rounded-2xl bg-[#FDB913] hover:bg-[#e0a40d] text-black transition-all hover:scale-105 shadow-xl shadow-yellow-500/10 group"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
