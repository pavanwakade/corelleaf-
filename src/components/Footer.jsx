import React from "react";
// import ViewOpenPositions from "./ViewOpenPositions.jsx";

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    { name: "Web Development", id: "services" },
    { name: "Mobile Apps", id: "services" },
    { name: "Cloud Solutions", id: "services" },
    { name: "Database Design", id: "services" },
    { name: "Cybersecurity", id: "services" },
    { name: "API Development", id: "services" },
  ];

  const quickLinks = [
    { name: "About Us", id: "about" },
    // { name: 'Our Team', id: 'team' },
    { name: "Portfolio", id: "portfolio" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks = [
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/company/corelleaf-design-studio/",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={20} />,
      href: "https://x.com/corelleaf",
      label: "Twitter",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/corelleaf/",
      label: "Instgram",
    },
    {
      icon: <Facebook size={20} />,
      href: "https://www.facebook.com/corelleaf",
      label: "Facebook",
    },
  ];

  return (
    <footer className="text-white bg-gray-900">
      <div className="container px-6 py-16 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-white">Corelleaf</h3>
              <p className="leading-relaxed text-gray-300">
                Transforming businesses through innovative technology solutions.
                Your trusted partner for digital transformation and software
                development.
              </p>
            </div>

            <div className="space-y-3">
              {/* <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <span className="text-gray-300">career@corelleaf.com</span>
              </div> */}
              {/* <div className="flex items-center gap-3">
                <Phone size={18} className="text-green-400" />
                <span className="text-gray-300">+91-7507454042</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-purple-400" />
                <span className="text-gray-300">Venus Garden Building, Office No- 10,
                  behind Bank of Baroda, Thite Vasti,
                  Kharadi, Maharashtra 411014.</span>
              </div> */}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(service.id)}
                    className="text-left text-gray-300 transition-colors duration-300 hover:text-blue-400"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-gray-300 transition-colors duration-300 hover:text-blue-400"
                  >
                    {link.name}
                  </button>
                </li>
              ))}

              <li>
                <button onClick={() => navigate("/ViewOpenPositions")}>
                  career
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="mb-4 text-lg font-semibold">Stay Updated</h4>
              <p className="mb-4 text-sm text-gray-300">
                Subscribe to our newsletter for the latest tech insights and
                company updates.
              </p>
              {/* <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700">
                  <Mail size={18} />
                </button>
              </div> */}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <a
                  href="mailto:info@corelleaf.com"
                  className="text-gray-300 transition hover:text-blue-400"
                >
                  info@corelleaf.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <a
                  href="mailto:career@corelleaf.com"
                  className="text-gray-300 transition hover:text-blue-400"
                >
                  career@corelleaf.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 text-gray-300 transition-colors duration-300 bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © 2025 corelleaf design studio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {/* <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Cookie Policy
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
