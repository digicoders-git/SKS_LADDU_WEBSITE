import { Mail, Phone, MapPin, Heart, Shield, FileText, Link as LinkIcon, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-primary)] text-white py-16 px-8 md:px-24 relative overflow-hidden border-t-1 border-[var(--color-secondary)]">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent"></div>
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-bubble footer-bubble-1"></div>
        <div className="footer-bubble footer-bubble-2"></div>
        <div className="footer-bubble footer-bubble-3"></div>
        <div className="footer-bubble footer-bubble-4"></div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .footer-bubble {
            position: absolute;
            background: rgba(212, 175, 55, 0.12);
            border-radius: 50%;
            animation: float-footer-bubble 23s infinite ease-in-out;
          }
          .footer-bubble-1 {
            width: 100px;
            height: 100px;
            left: 10%;
            top: 20%;
            animation-delay: 0s;
          }
          .footer-bubble-2 {
            width: 140px;
            height: 140px;
            right: 15%;
            top: 30%;
            animation-delay: 4.5s;
          }
          .footer-bubble-3 {
            width: 80px;
            height: 80px;
            left: 20%;
            bottom: 20%;
            animation-delay: 2.5s;
          }
          .footer-bubble-4 {
            width: 120px;
            height: 120px;
            right: 25%;
            bottom: 10%;
            animation-delay: 6.5s;
          }
          @keyframes float-footer-bubble {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.4;
            }
            50% {
              transform: translate(25px, -35px) scale(1.1);
              opacity: 0.6;
            }
          }
        `
      }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img src="/sks-logo.png" alt="SKS Logo" className="w-20 h-20 rounded-full border-2 border-[var(--color-secondary)] shadow-sm object-cover" />
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Bringing you the authentic taste of Sandila's traditional laddus for over 100 years.
              Made with pure ingredients and lots of love, our laddus carry the legacy of the Nawabs of Lucknow.
            </p>
            <p className="text-sm text-gray-400 italic mb-6">
              "The feast of the Nawabs is incomplete without Sandila's authentic Laddus!"
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/sks_laddu?igsh=MWp2Nm9xa3VsYndmOQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[var(--color-secondary)] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://m.youtube.com/%40sks_laddu?fbclid=PAb21jcAPXGGJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafj2w64xbpG4wS4xy-6qnB46HAugnXjTrzzK7plc5WsusWZCI2h5POQF81YNA_aem_CGusJXXzp0WZZ9_PSx_-AQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[var(--color-secondary)] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/916307736698"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[var(--color-secondary)] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-secondary)] mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors no-underline">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors no-underline">About Us</Link></li>
              <li><Link to="/laddus" className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors no-underline">Our Laddus</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors no-underline">Shop</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors no-underline">Contact</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-secondary)] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Legal
            </h4>
            <ul className="space-y-2">
              <li><Link to="/shipping-policy" className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors flex items-center gap-1 no-underline">
                <FileText className="w-4 h-4" />
                Shipping Policy
              </Link></li>
              <li><Link to="/return-policy" className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors flex items-center gap-1 no-underline">
                <FileText className="w-4 h-4" />
                Return Policy
              </Link></li>
              <li><Link to="/terms-of-service" className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors flex items-center gap-1 no-underline">
                <Shield className="w-4 h-4" />
                Terms of Service
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <h3 className="text-2xl text-[var(--color-secondary)] mb-6 font-bold text-center">Get In Touch</h3>
          <div className="flex justify-center gap-8 md:gap-12 flex-wrap text-base">
            <a href="mailto:sksladdu8313@gmail.com" className="flex items-center gap-2 hover:text-[var(--color-secondary)] transition-colors no-underline text-white">
              <Mail className="w-5 h-5" />
              sksladdu8313@gmail.com
            </a>
            <a href="tel:+916307736698" className="flex items-center gap-2 hover:text-[var(--color-secondary)] transition-colors no-underline text-white">
              <Phone className="w-5 h-5" />
              +91 6307736698
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ahirawan,+Sandila,+Hardoi,+Uttar+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--color-secondary)] transition-colors no-underline text-white"
            >
              <MapPin className="w-5 h-5" />
              Ahirawan, Sandila, UP
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            © 2026 SKS Laddu. Designed and Developed by <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-secondary)] hover:underline font-semibold">#TeamDigicoders</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;