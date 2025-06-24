import RotatingGallery from "@/components/RotatingGallery";
import { ArrowRight, Play } from 'lucide-react';

import logo1 from "../assets/logos/white/logo (1).png";
import logo2 from "../assets/logos/white/logo (2).png";
import logo3 from "../assets/logos/white/logo (3).png";
import logo4 from "../assets/logos/white/logo (4).png";
import logo5 from "../assets/logos/white/logo (5).png";
import logo6 from "../assets/logos/white/logo (6).png";
import logo7 from "../assets/logos/white/logo (7).png";
import logo8 from "../assets/logos/white/logo (8).png";
import logo9 from "../assets/logos/white/logo (9).png";
import logo10 from "../assets/logos/white/logo (10).png";
import logo11 from "../assets/logos/white/logo (11).png";
const RotatingLogoGallery = () => {
  const logos = [
    logo1, logo2, logo3, logo4, logo5, logo6,
    logo7, logo8, logo9, logo10, logo11
  ];

  const scrollingLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden h-24 bg-transparent">
      <div className="flex w-max animate-logo-scroll space-x-8 items-center h-full">
        {scrollingLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`logo-${index}`}
            className="h-16 w-auto object-contain opacity-80"
          />
        ))}
      </div>
    </div>
  );
};




const Home = () => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Rotating Background */}
      <div className="absolute inset-0 overflow-hidden">
        <RotatingGallery />
        <div className="absolute inset-0 bg-slate-900/70 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          <span className="block">Capturing Moments.</span>
          <span className="block text-yellow-500">Creating Stories.</span>
          <span className="block text-2xl md:text-3xl mt-4 font-light">Snap & Snip.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Professional Photography & Videography by M. Abdullah
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={scrollToPortfolio}
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            View Portfolio
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onClick={scrollToContact}
            className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            Book a Shoot
            <Play className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Rotating Logo Circle
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="relative w-32 h-32 rounded-full border-2 border-white animate-spin-slow">
          {logos.map((logo, idx) => {
            const angle = (360 / logos.length) * idx;
            return (
              <img
                key={idx}
                src={logo}
                alt={`logo-${idx}`}
                className="absolute w-6 h-6 object-contain"
                style={{
                  transform: `rotate(${angle}deg) translate(56px) rotate(-${angle}deg)`
                }}
              />
            );
          })}
        </div>
      </div> */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scale-75 z-20">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          <span className="block">Work With</span>
        </h1>
        <RotatingLogoGallery />
      </div>



    </section>
  );
};

export default Home;
