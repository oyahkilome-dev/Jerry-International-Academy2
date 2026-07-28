import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white leading-tight">Jerry International</span>
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Academy</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400">
              Empowering future leaders through excellence in education, character building, and innovation in a global community.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="tel:07030916304" className="text-slate-400 hover:text-white transition-colors"><Phone className="h-5 w-5" /></a>
              <a href="mailto:info@jerryacademy.com" className="text-slate-400 hover:text-white transition-colors"><Mail className="h-5 w-5" /></a>
              <a href="https://wa.me/2347030916304" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><MessageCircle className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><MapPin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-blue-400 transition-colors">Admissions</Link></li>
              <li><Link to="/news" className="hover:text-blue-400 transition-colors">News & Events</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-400 transition-colors">Gallery</Link></li>
              <li><Link to="/admin" className="hover:text-orange-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mission" className="hover:text-blue-400 transition-colors">Mission & Vision</Link></li>
              <li><Link to="/academics" className="hover:text-blue-400 transition-colors">Academics</Link></li>
              <li><Link to="/calendar" className="hover:text-blue-400 transition-colors">School Calendar</Link></li>
              <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span>123 Education Avenue,<br />Ikeja, Lagos State, Nigeria.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <span>07030916304</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <span>info@jerryacademy.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-blue-500 shrink-0" />
                <span>07030916304</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-center text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Jerry International Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
