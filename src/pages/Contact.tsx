
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/ButtonLoading';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="mb-12 text-center">
          <h1 className="heading-2 mb-3">Contact Us</h1>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to us using the form below.
          </p>
        </div>
        
        <div className="layout">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Phone className="h-8 w-8 mb-4 text-black" />
              <h3 className="text-lg font-medium mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-3">
                Available Monday to Friday, 9am to 5pm PST
              </p>
              <a href="tel:+14155552671" className="text-black font-medium">
                +1 (415) 555-2671
              </a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <Mail className="h-8 w-8 mb-4 text-black" />
              <h3 className="text-lg font-medium mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-3">
                We'll respond to your inquiry within 24 hours
              </p>
              <a href="mailto:support@monolith.com" className="text-black font-medium">
                support@monolith.com
              </a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <MapPin className="h-8 w-8 mb-4 text-black" />
              <h3 className="text-lg font-medium mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-3">
                Come by our store or headquarters
              </p>
              <address className="not-italic text-black font-medium">
                123 Design Street<br />
                San Francisco, CA 94103
              </address>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="heading-3 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select a topic</option>
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  isLoading={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="heading-3 mb-6">Our Location</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-200">
                {/* Placeholder for a map - in a real app, this would be a Google Maps or other map component */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="font-medium">Interactive map would be displayed here</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Store Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>11:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>12:00 PM - 5:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
