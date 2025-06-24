import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Send, Linkedin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xdkzwwav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: 'Thank you for your message. I\'ll get back to you within 24 hours.',
        });

        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again later.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Network Error',
        description: 'Please check your internet connection and try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="text-yellow-500">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to capture your story? Let's discuss your project and bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-900 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Project Subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">Snap.snip.studio@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <div className="text-gray-300">0312 4817936</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">WhatsApp</div>
                    <a 
                      href="https://wa.me/923124817936"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-yellow-500 transition-colors"
                    >
                      +92 312 4817936
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-gray-300">Pakistan</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Follow My Work</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href="https://www.instagram.com/snap_and_snip/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-yellow-500 p-4 rounded-lg transition-all duration-300 hover:scale-105 group flex items-center justify-center"
                >
                  <Instagram className="h-6 w-6 text-yellow-500 group-hover:text-slate-900" />
                </a>
                
                <a
                  href="https://www.linkedin.com/company/102275425/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-yellow-500 p-4 rounded-lg transition-all duration-300 hover:scale-105 group flex items-center justify-center"
                >
                  <Linkedin className="h-6 w-6 text-yellow-500 group-hover:text-slate-900" />
                </a>
                
                <a
                  href="https://www.youtube.com/@SnapandSnip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-yellow-500 p-4 rounded-lg transition-all duration-300 hover:scale-105 group flex items-center justify-center"
                >
                  <Youtube className="h-6 w-6 text-yellow-500 group-hover:text-slate-900" />
                </a>
                
                <a
                  href="https://wa.me/923124817936"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-yellow-500 p-4 rounded-lg transition-all duration-300 hover:scale-105 group flex items-center justify-center"
                >
                  <MessageCircle className="h-6 w-6 text-yellow-500 group-hover:text-slate-900" />
                </a>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-2xl p-6 border border-yellow-500/30">
              <h4 className="text-xl font-bold text-white mb-2">
                Ready to Start Your Project?
              </h4>
              <p className="text-gray-300 mb-4">
                Book a free consultation call to discuss your photography and videography needs.
              </p>
              <a
                href="https://wa.me/923124817936"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Schedule Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
