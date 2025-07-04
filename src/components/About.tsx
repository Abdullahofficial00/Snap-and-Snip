
import { Camera, Video, Award, Users } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Camera, number: '500+', label: 'Photos Captured' },
    { icon: Video, number: '100+', label: 'Videos Created' },
    { icon: Award, number: '50+', label: 'Happy Clients' },
    { icon: Users, number: '3+', label: 'Years Experience' }
  ];

  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image with blob background */}
          <div className="relative flex justify-center">
            {/* Animated blob background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full animate-pulse"></div>
              <div className="absolute w-72 h-72 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
              <div className="absolute w-64 h-64 bg-gradient-to-bl from-green-500/10 to-teal-500/10 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
            </div>
            
            {/* Profile image */}
            <div className="relative z-10 w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-500/30">
              <img
                src="/lovable-uploads/e58f206f-896b-406b-8012-73975ac2a63f.png"
                alt="M. Abdullah - Professional Photographer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Floating camera icon
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-slate-900 p-4 rounded-xl shadow-lg z-20 animate-bounce">
              <Camera className="h-8 w-8" />
            </div> */}
          </div>
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet <span className="text-yellow-500">M. Abdullah</span>
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Welcome to Snap & Snip, where every frame tells a story. I'm M. Abdullah, 
              a passionate content creator specializing in photography and videography 
              that captures the essence of life's most precious moments.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              My journey began with a simple belief: every moment deserves to be 
              preserved beautifully. From intimate portraits to grand celebrations, 
              from corporate events to creative campaigns, I bring a unique perspective 
              that transforms ordinary moments into extraordinary memories.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              My philosophy is simple - authenticity over perfection. I believe in 
              capturing genuine emotions, real connections, and the natural beauty 
              that exists in every story waiting to be told.
            </p>
          </div>
          
          
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-slate-700 p-6 rounded-xl mb-4 group-hover:bg-yellow-500 transition-colors duration-300">
                <stat.icon className="h-8 w-8 text-yellow-500 group-hover:text-slate-900 mx-auto" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
