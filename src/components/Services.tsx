
import { Camera, Video, Palette, Share2 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: 'Event Photography',
      description: 'Capture your special moments with professional event photography. From weddings to corporate events, I ensure every important moment is preserved beautifully.',
      features: ['Full event coverage', 'High-resolution images', 'Quick turnaround', '100+ edited photos']
    },
    {
      icon: Video,
      title: 'Cinematic Videography',
      description: 'Create stunning cinematic videos that tell your story. Perfect for weddings, promotional content, and special events with professional editing and effects.',
      features: ['4K video quality', 'Professional editing', 'Color grading', 'Multiple formats']
    },
    {
      icon: Palette,
      title: 'Product Shoots',
      description: 'Showcase your products with high-quality photography that drives sales. Professional lighting and composition to make your products stand out.',
      features: ['Studio setup', 'Multiple angles', 'Lifestyle shots', 'E-commerce ready']
    },
    {
      icon: Share2,
      title: 'Social Media Content',
      description: 'Boost your social media presence with engaging visual content. Custom photography and videography tailored for your brand and platform.',
      features: ['Platform optimization', 'Brand consistency', 'Trending formats', 'Content strategy']
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-yellow-500">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional photography and videography services tailored to bring your vision to life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 hover:bg-slate-700 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center mb-6">
                <div className="bg-yellow-500 p-3 rounded-xl mr-4 group-hover:bg-yellow-400 transition-colors">
                  <service.icon className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-2xl p-8 border border-yellow-500/30">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Create Something Amazing?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your project and bring your vision to life. Get in touch for a free consultation and custom quote.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
