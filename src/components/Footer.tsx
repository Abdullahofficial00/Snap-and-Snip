
import { Camera, Instagram, Youtube, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/bb86095e-6a9d-446d-8dea-6592aee02720.png" 
                alt="Snap & Snip Logo" 
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold text-white">Snap & Snip</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Capturing moments. Creating stories. Professional photography and videography 
              by M. Abdullah, bringing your vision to life with creativity and passion.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/snap_and_snip/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-yellow-500 p-3 rounded-lg transition-all duration-300 hover:scale-105 group"
              >
                <Instagram className="h-5 w-5 text-yellow-500 group-hover:text-slate-900" />
              </a>
              <a
                href="https://www.linkedin.com/company/102275425/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-yellow-500 p-3 rounded-lg transition-all duration-300 hover:scale-105 group"
              >
                <Linkedin className="h-5 w-5 text-yellow-500 group-hover:text-slate-900" />
              </a>
              <a
                href="https://www.youtube.com/@SnapandSnip"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-yellow-500 p-3 rounded-lg transition-all duration-300 hover:scale-105 group"
              >
                <Youtube className="h-5 w-5 text-yellow-500 group-hover:text-slate-900" />
              </a>
              <a
                href="https://wa.me/923124817936"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-yellow-500 p-3 rounded-lg transition-all duration-300 hover:scale-105 group"
              >
                <MessageCircle className="h-5 w-5 text-yellow-500 group-hover:text-slate-900" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['home', 'about', 'portfolio', 'services'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-gray-300 hover:text-yellow-500 transition-colors capitalize"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300 text-sm">Snap.snip.studio@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300 text-sm">0312 4817936</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-yellow-500" />
                <a 
                  href="https://wa.me/923124817936"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-yellow-500 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 Snap & Snip. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm mt-4 md:mt-0">
            Professional Photography & Videography by M. Abdullah
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
