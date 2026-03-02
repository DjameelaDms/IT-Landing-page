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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { ScrollArea } from "./components/ui/scroll-area";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Assets
const LOGO_URL = "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/0hzqlwr8_A_Logo-39.png";

// Solution Background Images (User Provided)
const SOLUTION_IMAGES = {
  disasterms: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/uhcudkwx_DisasterMS.jpeg",
  chatbot: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/r17o5z6g_Chatbot.jpeg",
  predictive: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/8p6d6ixy_Predictive%20Models.jpeg",
  emcc: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/fo7g0r4a_EM%20-CC.jpeg",
  iot: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/kuz3we6e_IOT.jpeg",
  protocol: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/98h2v114_Protocol%20designer.jpeg",
  codeblue: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/8qdv50zu_Tele%20Code%20Blue%20Kit.jpeg",
  triage: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/3vpmqdvv_Triage.jpeg",
  teleintubation: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/bu492laq_Tele-Intubation.jpeg"
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
    bgImage: SOLUTION_IMAGES.chatbot
  },
  {
    id: 3,
    title: "Predictive Models",
    description: "Statistical models for predicting climate-related changes and natural disasters, improving preparedness.",
    icon: TrendingUp,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.predictive
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
    size: "",
    bgImage: SOLUTION_IMAGES.teleintubation
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
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-16">
          {/* Text Content */}
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A5F] leading-tight mb-4 text-center" data-testid="hero-headline">
              Digital Ecosystem for Smarter Hospital Operations
            </h1>
            <p className="font-heading text-lg sm:text-xl text-[#8B4513] font-semibold text-center mb-8">
              Smarter Hospitals. Better Outcomes. Ahead of the Curve.
            </p>
            
            <div className="font-heading text-[#3D1C1C]/80 leading-relaxed space-y-6 text-left max-w-3xl mx-auto">
              <p>
                At ARETION Informatics Solutions, we understand that modern healthcare demands more than incremental improvements—it demands transformation. Hospitals and healthcare institutions face unprecedented challenges: rising operational complexity, patient safety imperatives, and the need to deliver exceptional care at scale.
              </p>
              <p className="font-semibold text-[#1E3A5F]">
                We don't just offer solutions. We partner with you to reimagine what's possible.
              </p>
              
              <div className="mt-8">
                <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-4">What Sets Us Apart</h3>
                <p className="mb-4">
                  Our expertise spans the full stack—from intelligent systems architecture to advanced statistical disease modeling, process automation, and predictive analytics. Our team of full-stack engineers, data scientists, and domain specialists work in concert to solve the problems that matter most:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Smarter Operations:</strong> Streamlined workflows, optimized resource allocation, and reduced inefficiencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Safer Patient Care:</strong> Real-time insights, risk prediction, and evidence-driven clinical decision support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Future-Ready Infrastructure:</strong> Scalable, adaptable solutions that evolve with your institution</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-4">Who We Serve</h3>
                <p>
                  Whether you're a regional hospital seeking operational excellence, a large healthcare network pursuing system-wide transformation, or a research institution advancing medical science, ARETION is built for you.
                </p>
              </div>
              
              <p className="text-[#1E3A5F] font-medium mt-6">
                The healthcare landscape is changing rapidly. The question isn't whether you'll adapt—it's whether you'll lead.
              </p>
              <p className="font-semibold text-[#8B4513] text-lg">
                Let's make your hospital smarter, together.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-10">
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
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary" 
                data-testid="demo-request-btn"
              >
                Request a Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
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
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to backend which will email and save to database
      await axios.post(`${API}/contact`, formData);
      
      // Show thank you modal
      setShowThankYou(true);
      setFormData({ name: "", email: "", organization: "", interest: "", message: "" });
    } catch (error) {
      console.error("Failed to submit form:", error);
      toast.error("Failed to send message. Please try again.");
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
                <option value="">Select Category</option>
                <option value="sales">Sales Inquiry</option>
                <option value="demo">Schedule a Demo</option>
                <option value="implementation">Implementation & Integration</option>
                <option value="partnership">Partnership</option>
                <option value="research">Research Collaboration</option>
                <option value="careers">Careers/Recruitment</option>
                <option value="other">Other</option>
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

      {/* Thank You Modal */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-md bg-[#F5F0E8] text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#1E3A5F] flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <DialogTitle className="font-heading text-2xl text-[#1E3A5F]">
              Thank You for Contacting Us!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[#3D1C1C]/80 mb-4">
              Your message has been sent successfully. Our team will review your inquiry and get back to you within 24-48 hours.
            </p>
          </div>
          <button 
            onClick={() => setShowThankYou(false)}
            className="btn-primary w-full"
            data-testid="thank-you-close-btn"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState(null);

  const policies = {
    privacy: {
      title: "Privacy Notice",
      lastUpdated: "9 Feb 2026",
      content: `We, ARETION & Company (the brand used on aretion.co.uk), understand that your privacy is important to you. We are committed to respecting your privacy and protecting your personal data.

1. Data Controller
When ARETION & Company collects and processes personal data in accordance with this Privacy Notice, we do so as a data controller.

Company details:
• Legal name: ARETION & Company
• Registered office: 71-75 SHELTON STREET COVENT GARDEN, LONDON, WC2H 9JQ
• Contact email: post@aretion.co.uk
• Data Protection Officer: dpo@aretion.co.uk

2. Who This Notice Applies To
This Privacy Notice applies to:
• Website visitors
• People who contact us with enquiries
• Representatives of clients, partners, suppliers
• Individuals who request or receive services
• Job applicants

3. How We Collect Personal Data
We collect personal data:
• Directly from you (when you email us or submit an enquiry)
• Automatically when you use our website
• From your organisation
• From third parties where appropriate

4. Categories of Personal Data
• Name, email address, telephone number
• Organisation and role
• The content of your messages
• Website technical and usage data
• Recruitment data (if applicable)

5. Why We Use Personal Data
• Providing and securing the website
• Responding to enquiries and relationship management
• Service delivery
• Legal compliance and protection of rights

6. Your Rights
You may have the right to:
• Request access to personal data
• Request rectification
• Request erasure
• Request restriction of processing
• Object to processing
• Request data portability
• Withdraw consent

7. Contact and Complaints
Contact: post@aretion.co.uk (please include "Privacy" in the subject line)
Complaints: You have the right to lodge a complaint with the Information Commissioner's Office (ICO).`
    },
    terms: {
      title: "Terms of Use",
      lastUpdated: "7 Feb 2026",
      content: `These Terms of Use apply to your access to and use of the ARETION & Company website. By using the Site, you agree to these Terms.

1. About These Terms
These Terms apply to your use of the Site and all content and functionality made available through the Site.

2. About Us
The Site is operated by ARETION & Company.
Contact: Post@aretion.co.uk
Registered office: 71-75 SHELTON STREET COVENT GARDEN, LONDON, WC2H 9JQ

3. Copyright and Intellectual Property
All Site Content is owned by or licensed to ARETION and is protected by applicable intellectual property laws. You may not copy, reproduce, modify, or distribute any Site Content without our prior written permission.

4. Use of Site Content
We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Site for your internal, non-commercial use.

5. Restrictions
You may not:
• Access, search, collect, or mine data from the Site by automated means
• "Mirror" the Site Content
• Use the Site to develop AI tools or machine learning systems
• Use the Site in violation of applicable laws

6. User Submissions
If you submit materials to us, you grant ARETION a worldwide, non-exclusive, royalty-free licence to use your submission for purposes connected with operating the Site.

7. Disclaimers
The Site and Site Content are provided "as is" and "as available", without warranty of any kind.

8. Limitation of Liability
To the extent permitted by law, ARETION will not be liable for any loss or damage arising out of your use of the Site.

9. Governing Law
These Terms are governed by the laws of England and Wales.

10. Contact
Questions: compliance@aretion.co.uk`
    },
    conduct: {
      title: "Code of Conduct",
      lastUpdated: "10 Feb 2026",
      content: `ARETION & Company and its subsidiaries are committed to the highest standards of ethical conduct, professional integrity, and legal compliance.

Our Core Values:
• Integrity - Act with honesty, fairness, and transparency
• Patient-Centred Impact - Prioritise patient safety and wellbeing
• Independence and Objectivity - Provide impartial, evidence-based advice
• Respect - Value the dignity and rights of everyone
• Accountability - Take responsibility for our work
• Sustainability - Consider long-term environmental and social impact
• Transparency - Communicate openly and honestly

Key Principles:

1. Anti-Bribery and Anti-Corruption
Zero-tolerance policy on bribery and corruption in any form.

2. Conflicts of Interest
Committed to identifying, disclosing, and managing conflicts of interest fairly and transparently.

3. Confidentiality and Data Protection
Committed to protecting sensitive and confidential information, including patient data and client information.

4. Professional Conduct
• Provide honest, competent, evidence-based advice
• Challenge advice that could harm patients
• Respect patient autonomy and informed consent

5. Fair Treatment and Inclusion
• Equal opportunity in recruitment and career development
• Fair pay and reward
• Respectful treatment regardless of background
• Zero tolerance for discrimination or harassment

6. Speaking Up
We encourage reporting concerns without fear of retaliation.

Contact:
• Compliance Team: compliance@aretion.co.uk
• Whistleblowing Hotline: +44 20 3985 0907`
    },
    antibribery: {
      title: "Anti-Bribery and Anti-Corruption Policy",
      lastUpdated: "14 Feb 2026",
      content: `ARETION & Company has ZERO TOLERANCE for bribery and corruption in any form.

1. Policy Statement
We are committed to conducting business ethically, transparently, and in full compliance with all applicable anti-bribery and anti-corruption laws.

2. What is Bribery?
Bribery is the offer, promise, giving, requesting, or acceptance of any advantage with the intention of:
• Inducing someone to perform an improper function
• Rewarding them for having done so
• Influencing them to act improperly

3. Prohibited Conduct
• Offering or giving bribes
• Receiving or soliciting bribes
• Using third parties for bribery
• Facilitation payments (strictly prohibited)

4. Gifts and Hospitality
Modest, reasonable gifts and hospitality may be appropriate if they:
• Are of modest value (typically under £50)
• Are not cash or cash equivalents
• Are not connected to pending business decisions
• Are transparent and properly recorded

5. Government Officials
Interactions with government officials require heightened care. Prior written approval from Compliance is required before providing any benefit.

6. Third-Party Intermediaries
We are responsible for the conduct of agents, consultants, and other intermediaries. Due diligence is required before engagement.

7. Reporting
If you suspect bribery or corruption, report immediately to:
• Your manager
• Compliance Team: compliance@aretion.co.uk
• Whistleblowing Hotline: +44 20 3985 0907

8. Protection Against Retaliation
ARETION prohibits retaliation against anyone who reports concerns in good faith.

9. Consequences
Breaches may result in:
• Disciplinary action including dismissal
• Criminal prosecution
• Civil liability
• Regulatory sanctions`
    }
  };

  return (
    <>
      <footer className="footer-section py-12" data-testid="footer">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-4">
              <img src={LOGO_URL} alt="ARETION" className="h-10 w-auto brightness-0 invert" />
              <span className="font-heading text-lg font-bold text-white">ARETION & Company</span>
            </div>

            {/* Footer Links */}
            <nav className="flex flex-wrap justify-center gap-6" data-testid="footer-links">
              <button 
                onClick={() => setActivePolicy('privacy')} 
                className="footer-link cursor-pointer" 
                data-testid="footer-privacy"
              >
                Privacy Notice
              </button>
              <button 
                onClick={() => setActivePolicy('terms')} 
                className="footer-link cursor-pointer" 
                data-testid="footer-terms"
              >
                Terms of Use
              </button>
              <button 
                onClick={() => setActivePolicy('conduct')} 
                className="footer-link cursor-pointer" 
                data-testid="footer-conduct"
              >
                Code of Conduct
              </button>
              <button 
                onClick={() => setActivePolicy('antibribery')} 
                className="footer-link cursor-pointer" 
                data-testid="footer-anti-bribery"
              >
                Anti-Bribery Policy
              </button>
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

      {/* Policy Modal */}
      <Dialog open={activePolicy !== null} onOpenChange={() => setActivePolicy(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] bg-[#F5F0E8]">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-[#1E3A5F]">
              {activePolicy && policies[activePolicy]?.title}
            </DialogTitle>
            <p className="text-sm text-[#6B8CAE]">
              Last updated: {activePolicy && policies[activePolicy]?.lastUpdated}
            </p>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="prose prose-sm max-w-none">
              {activePolicy && (
                <pre className="whitespace-pre-wrap font-body text-sm text-[#3D1C1C] leading-relaxed bg-transparent border-none p-0">
                  {policies[activePolicy]?.content}
                </pre>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
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
