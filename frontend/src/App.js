import React, { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Brain, 
  TrendingUp, 
  Users, 
  Radio, 
  Stethoscope, 
  HeartPulse, 
  Wifi, 
  FileText,
  Mail,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Clock,
  Building
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Assets
const LOGO_URL = "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/0hzqlwr8_A_Logo-39.png";

// Solution Background Images (User Provided)
const SOLUTION_IMAGES = {
  disasterms: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/uhcudkwx_DisasterMS.jpeg",
  emcc: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/fo7g0r4a_EM%20-CC.jpeg",
  iot: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/kuz3we6e_IOT.jpeg",
  protocol: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/98h2v114_Protocol%20designer.jpeg",
  codeblue: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/gu3579um_Tele%20Code%20Blue%20Kit.jpeg",
  triage: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/3vpmqdvv_Triage.jpeg"
};

// Solutions Data
const solutions = [
  {
    id: 1,
    title: "DisasterMs",
    description: "Advanced ecosystem for facility safety with early warning, disaster prediction, and full closed-loop response system.",
    icon: ShieldCheck,
    comingSoon: false,
    size: "md:col-span-2",
    bgImage: SOLUTION_IMAGES.disasterms
  },
  {
    id: 2,
    title: "Specialized Chatbot",
    description: "Secure AI chatbot trained on hospital data, providing accurate, source-based answers with minimal hallucination.",
    icon: Brain,
    comingSoon: false,
    size: "",
    bgImage: null
  },
  {
    id: 3,
    title: "Predictive Models",
    description: "Statistical models for predicting climate-related changes and natural disasters, improving preparedness.",
    icon: TrendingUp,
    comingSoon: false,
    size: "md:row-span-2",
    bgImage: null
  },
  {
    id: 4,
    title: "Triage",
    description: "Digital system for recognizing and identifying mass-casualty victims, fully integrated with hospital HIS.",
    icon: Users,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.triage
  },
  {
    id: 5,
    title: "EM:CC",
    description: "Emergency Medicine Cluster Coverage connecting hospitals in the same region for safe patient journey management.",
    icon: Radio,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.emcc
  },
  {
    id: 6,
    title: "Tele-Intubation",
    description: "Remote expert support for critical airway management in emergency situations.",
    icon: Stethoscope,
    comingSoon: false,
    size: "md:col-span-2",
    bgImage: null
  },
  {
    id: 7,
    title: "Tele Code Blue Kit",
    description: "Virtual tools to activate and coordinate code blue events remotely.",
    icon: HeartPulse,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.codeblue
  },
  {
    id: 8,
    title: "Medical IoT",
    description: "Real-time connection of medical devices for improved situational awareness.",
    icon: Wifi,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.iot
  },
  {
    id: 9,
    title: "Protocol Designer",
    description: "AI SaaS platform to design and manage custom disaster and emergency protocols.",
    icon: FileText,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.protocol
  }
];

// Benefits Data
const benefits = [
  { title: "Stronger Safety", description: "Enhanced readiness for any emergency scenario" },
  { title: "Smarter Decisions", description: "Data-driven clinical decision support" },
  { title: "Regional Coordination", description: "Better patient flow across facilities" },
  { title: "Clear Visibility", description: "Comprehensive dashboards for leaders" },
  { title: "Modular Platform", description: "Scalable solutions that grow with you" }
];

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header-sticky ${isScrolled ? "header-scrolled" : ""}`} data-testid="header">
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" data-testid="logo-link">
            <img src={LOGO_URL} alt="ARETION" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="font-heading text-xl font-bold text-[#1E3A5F]">ARETION</span>
              <span className="block text-xs font-subheading text-[#6B8CAE] tracking-wider">INFORMATICS SOLUTIONS</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            <button 
              onClick={() => scrollToSection("solutions")} 
              className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
              data-testid="nav-solutions"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection("benefits")} 
              className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
              data-testid="nav-benefits"
            >
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection("demo")} 
              className="btn-primary"
              data-testid="nav-book-demo"
            >
              Book a Demo
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-[#1E3A5F]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-[#6B8CAE]/20"
            data-testid="mobile-nav"
          >
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("solutions")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Solutions</button>
              <button onClick={() => scrollToSection("benefits")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Benefits</button>
              <button onClick={() => scrollToSection("contact")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Contact</button>
              <button onClick={() => scrollToSection("demo")} className="btn-primary w-full">Book a Demo</button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="hero-section" data-testid="hero-section">
      <div className="hero-pattern"></div>
      <div className="container-main relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center py-12">
          {/* Text Content */}
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
              Healthcare Innovation
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A5F] leading-tight mb-6" data-testid="hero-headline">
              Integrated Digital Ecosystem for Smarter Hospital Operations
            </h1>
            <p className="font-body text-lg text-[#3D1C1C]/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Streamlining healthcare workflows with precision-engineered informatics solutions. 
              Partner with medical cities across Saudi Arabia for innovative healthcare transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
                data-testid="hero-explore-btn"
              >
                Explore Solutions
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
              <button 
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
                data-testid="hero-consultation-btn"
              >
                Request Consultation
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-12 mt-16">
              <div className="text-center">
                <span className="block font-heading text-4xl font-bold text-[#1E3A5F]">98%</span>
                <span className="text-sm text-[#6B8CAE]">Efficiency Rate</span>
              </div>
              <div className="text-center">
                <span className="block font-heading text-4xl font-bold text-[#1E3A5F]">24/7</span>
                <span className="text-sm text-[#6B8CAE]">Support Coverage</span>
              </div>
              <div className="text-center">
                <span className="block font-heading text-4xl font-bold text-[#1E3A5F]">9+</span>
                <span className="text-sm text-[#6B8CAE]">Integrated Solutions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Solutions Section
const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="solutions-section">
      <div className="container-main">
        {/* Section Header */}
        <motion.div 
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Our Solutions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4" data-testid="solutions-title">
            Comprehensive Healthcare Informatics Suite
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            Discover our integrated platform designed to enhance safety, efficiency, and coordination within healthcare facilities.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="solutions-grid" data-testid="solutions-grid">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              className={`solution-card ${solution.size} ${solution.bgImage ? 'has-bg-image' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`solution-card-${solution.id}`}
              style={solution.bgImage ? {
                position: 'relative',
                overflow: 'hidden'
              } : {}}
            >
              {solution.bgImage && (
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${solution.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(1px)',
                    opacity: 0.2,
                    transform: 'scale(1.05)'
                  }}
                />
              )}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded bg-[#1E3A5F]/10 flex items-center justify-center">
                    <solution.icon className="h-6 w-6 text-[#1E3A5F]" />
                  </div>
                  {solution.comingSoon ? (
                    <span className="badge-coming-soon">Coming Soon</span>
                  ) : (
                    <span className="badge-available">Available</span>
                  )}
                </div>
                <h3 className="font-subheading text-xl font-semibold text-[#1E3A5F] mb-2">
                  {solution.title}
                </h3>
                <p className="font-body text-[#3D1C1C]/70 text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  return (
    <section id="benefits" className="benefits-section py-20 lg:py-28" data-testid="benefits-section">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
              Why ARETION
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-6" data-testid="benefits-title">
              Precision, Integration, Security
            </h2>
            <p className="font-body text-lg text-[#3D1C1C]/80 max-w-2xl mx-auto">
              Our modular platform empowers healthcare organizations with tools they can grow over time, 
              ensuring stronger safety and smarter clinical decisions.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="benefits-list">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="flex items-start gap-4 p-6 bg-white/80 rounded border border-[#6B8CAE]/20"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-subheading font-semibold text-[#1E3A5F]">{benefit.title}</h4>
                  <p className="text-sm text-[#3D1C1C]/70">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Row */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-[#1E3A5F] rounded-lg p-6 text-center min-w-[140px]">
              <span className="font-heading text-3xl font-bold text-white mb-1 block">15+</span>
              <span className="text-[#C4A77D] text-sm">Years of Excellence</span>
            </div>
            <div className="bg-white rounded-lg p-6 text-center min-w-[140px] border border-[#6B8CAE]/20">
              <span className="font-heading text-3xl font-bold text-[#1E3A5F] mb-1 block">50+</span>
              <span className="text-[#6B8CAE] text-sm">Hospitals Served</span>
            </div>
            <div className="bg-white rounded-lg p-6 text-center min-w-[140px] border border-[#6B8CAE]/20">
              <span className="font-heading text-3xl font-bold text-[#1E3A5F] mb-1 block">99.9%</span>
              <span className="text-[#6B8CAE] text-sm">Uptime</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Demo Section
const DemoSection = () => {
  return (
    <section id="demo" className="py-20 lg:py-28 bg-white" data-testid="demo-section">
      <div className="container-main">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
              Get Started
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-6" data-testid="demo-title">
              Ready to Transform Your Healthcare Operations?
            </h2>
            <p className="font-body text-lg text-[#3D1C1C]/80 mb-10 max-w-2xl mx-auto">
              Our consultants are ready to help you navigate your healthcare goals. 
              Book a demo to see our solutions in action.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a href="mailto:informatics@aretion.co.uk?subject=Demo Request" className="btn-primary" data-testid="demo-request-btn">
                Request a Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="mailto:informatics@aretion.co.uk?subject=Consultation Booking" className="btn-secondary" data-testid="demo-consultation-btn">
                Book Consultation
              </a>
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-6" data-testid="demo-features">
              <div className="stats-card">
                <Clock className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">Quick Setup</h4>
                <p className="text-sm text-[#3D1C1C]/70">Get started within days, not months</p>
              </div>
              <div className="stats-card">
                <Building className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">Enterprise Ready</h4>
                <p className="text-sm text-[#3D1C1C]/70">Scalable for any organization size</p>
              </div>
              <div className="stats-card">
                <ShieldCheck className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">Secure & Compliant</h4>
                <p className="text-sm text-[#3D1C1C]/70">Built with healthcare standards</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="testimonials-section">
      <div className="container-main">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Trusted By
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4" data-testid="testimonials-title">
            Our Partners & Clients
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80 mb-8">
            Working alongside leading healthcare institutions in Saudi Arabia and beyond.
          </p>
          
          {/* CTA to Contact */}
          <div className="mt-8">
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-secondary"
              data-testid="testimonials-contact-btn"
            >
              Become a Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    interest: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", organization: "", interest: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section py-20 lg:py-28" data-testid="contact-section">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#C4A77D] mb-4">
              Get In Touch
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6" data-testid="contact-title">
              Contact Us Today
            </h2>
            <p className="font-body text-white/80 mb-8">
              Ready to explore innovative solutions for your healthcare organization? 
              Fill out the form below or reach out directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="form-input"
                  data-testid="contact-name-input"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="form-input"
                  data-testid="contact-email-input"
                />
              </div>
              <input
                type="text"
                placeholder="Organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="form-input"
                data-testid="contact-organization-input"
              />
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="form-input"
                data-testid="contact-interest-select"
              >
                <option value="">Select Area of Interest</option>
                <option value="disasterms">DisasterMs - Crisis Management</option>
                <option value="chatbot">Specialized Chatbot</option>
                <option value="predictive">Predictive Models</option>
                <option value="triage">Triage System</option>
                <option value="emcc">EM:CC - Emergency Coordination</option>
                <option value="general">General Inquiry</option>
                <option value="partnership">Partnership Opportunity</option>
              </select>
              <textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="form-input resize-none"
                data-testid="contact-message-textarea"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto bg-[#C4A77D] hover:bg-[#8B4513]"
                data-testid="contact-submit-btn"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pl-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20" data-testid="contact-info">
              <h3 className="font-subheading text-xl font-semibold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-[#C4A77D]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#C4A77D]" />
                  </div>
                  <div>
                    <span className="block font-subheading font-semibold text-white mb-1">Email Us</span>
                    <a 
                      href="mailto:informatics@aretion.co.uk" 
                      className="text-[#C4A77D] hover:text-white transition-colors"
                      data-testid="contact-email-link"
                    >
                      informatics@aretion.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-[#C4A77D]/20 flex items-center justify-center flex-shrink-0">
                    <Building className="h-5 w-5 text-[#C4A77D]" />
                  </div>
                  <div>
                    <span className="block font-subheading font-semibold text-white mb-1">ARETION & Company</span>
                    <span className="text-white/70 text-sm">Informatics Solutions Division</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-[#C4A77D]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#C4A77D]" />
                  </div>
                  <div>
                    <span className="block font-subheading font-semibold text-white mb-1">Response Time</span>
                    <span className="text-white/70 text-sm">We typically respond within 24-48 hours</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/20">
                <p className="text-white/80 text-sm mb-4">
                  For immediate inquiries or partnerships, email us directly at:
                </p>
                <a 
                  href="mailto:informatics@aretion.co.uk"
                  className="inline-flex items-center text-[#C4A77D] font-semibold hover:text-white transition-colors"
                  data-testid="contact-direct-email"
                >
                  informatics@aretion.co.uk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-section py-12" data-testid="footer">
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="ARETION" className="h-10 w-auto brightness-0 invert" />
            <div>
              <span className="font-heading text-lg font-bold text-white">ARETION</span>
              <span className="block text-xs text-white/60">& Company</span>
            </div>
          </div>

          {/* Footer Links */}
          <nav className="flex flex-wrap justify-center gap-6" data-testid="footer-links">
            <a href="#" className="footer-link" data-testid="footer-privacy">Privacy Notice</a>
            <a href="#" className="footer-link" data-testid="footer-terms">Terms of Use</a>
            <a href="#" className="footer-link" data-testid="footer-conduct">Code of Conduct</a>
            <a href="#" className="footer-link" data-testid="footer-anti-bribery">Anti-Bribery Policy</a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm" data-testid="footer-copyright">
            © {currentYear} ARETION & Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <BenefitsSection />
        <DemoSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
