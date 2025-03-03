
import { Layout } from '@/components/layout/Layout';
import { Building, Mail, MapPin, Phone, ShoppingBag, Users } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="mb-12 text-center">
          <h1 className="heading-2 mb-3">About Us</h1>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Learn more about our story, mission, and the team behind MONOLITH.
          </p>
        </div>
        
        {/* Story section */}
        <div className="layout mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="heading-3 mb-4">Our Story</h2>
              <p className="mb-4">
                Founded in 2020, MONOLITH began with a simple vision: to create premium products that 
                combine functionality, quality, and timeless design. What started as a small passion 
                project has grown into a brand trusted by customers worldwide.
              </p>
              <p>
                We believe that exceptional products should be accessible to everyone. This philosophy 
                guides everything we do - from product development to customer service. Each item in our 
                collection is thoughtfully designed and rigorously tested to ensure it meets our high standards.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1565126773320-5c95846d51bd?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Our store" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Mission section */}
        <div className="bg-gray-50 py-20 mb-20">
          <div className="layout">
            <div className="text-center max-w-2xl mx-auto">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-black" />
              <h2 className="heading-3 mb-6">Our Mission</h2>
              <p className="body text-muted-foreground">
                At MONOLITH, our mission is to deliver products that enhance everyday experiences. 
                We're committed to sustainable practices, ethical manufacturing, and creating lasting 
                relationships with our customers. We believe that quality doesn't have to come at the 
                expense of responsibility, and we're constantly seeking ways to minimize our 
                environmental footprint while maximizing product performance.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team section */}
        <div className="layout mb-20">
          <h2 className="heading-3 mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              {
                name: "Jamie Chen",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              {
                name: "Sam Patel",
                role: "Customer Experience",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Company info */}
        <div className="bg-black text-white py-16">
          <div className="layout">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start">
                <Building className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Our Office</h3>
                  <p className="text-gray-300">
                    MONOLITH Headquarters<br />
                    123 Design Street<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Join Our Team</h3>
                  <p className="text-gray-300">
                    We're always looking for talented individuals to join our team. 
                    Check out our careers page for current openings.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Get In Touch</h3>
                  <p className="text-gray-300">
                    Have questions or feedback?<br />
                    Email us at <a href="mailto:hello@monolith.com" className="underline">hello@monolith.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
