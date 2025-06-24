import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Zynab Farooq',
      role: 'Bride',
      rating: 5,
      text: 'M. Abdullah captured our wedding day perfectly! Every moment was beautifully preserved, and the cinematic video brought tears to our eyes. Absolutely recommended!'
    },
    {
      id: 2,
      name: 'Shuja Ul Hassan',
      role: 'The Stem Educator',
      rating: 5,
      text: 'Snap & Snip Studio did a fantastic job capturing the highlights of our STEM Educators event with creativity and professionalism. Their visuals greatly enhanced our event’s impact and audience engagement.'
    },
    {
      id: 3,
      name: 'Danish Gaffar',
      role: 'Digi Lawyer',
      rating: 5,
      text: 'Working with Snap & Snip transformed my social media presence. The content is engaging, on-brand, and perfectly optimized for each platform. Amazing collaboration!'
    },
    {
      id: 4,
      name: 'Ayesha',
      role: 'BioVet',
      rating: 5,
      text: 'Professional, reliable, and incredibly talented. M. Abdullah covered our corporate event and delivered stunning photos that perfectly captured the atmosphere.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client <span className="text-yellow-500">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients say about working with Snap & Snip.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 h-12 w-12 text-yellow-500/20" />

            {/* Current Testimonial */}
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-white font-semibold text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-yellow-500' : 'bg-gray-600'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
