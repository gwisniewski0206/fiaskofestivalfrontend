import { Ticket, Clock, Shield, Car, Utensils, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Info = () => {
  const ticketTypes = [
    {
      name: 'General Admission',
      price: '$199',
      features: ['3-Day Festival Access', 'Main Stage Views', 'Food Court Access', 'Merchandise Discounts'],
      available: true
    },
    {
      name: 'VIP Experience',
      price: '$499',
      features: ['3-Day Festival Access', 'VIP Viewing Areas', 'Exclusive Bar Access', 'Meet & Greet Opportunities', 'VIP Restrooms', 'Express Entry'],
      available: true,
      popular: true
    },
    {
      name: 'Artist Pass',
      price: '$999',
      features: ['3-Day Festival Access', 'Backstage Access', 'Artist Meet & Greets', 'Exclusive After-Parties', 'VIP + Benefits', 'Luxury Amenities'],
      available: false
    }
  ];

  const schedule = [
    { day: 'Friday', date: 'August 15', hours: '6:00 PM - 4:00 AM' },
    { day: 'Saturday', date: 'August 16', hours: '2:00 PM - 6:00 AM' },
    { day: 'Sunday', date: 'August 17', hours: '2:00 PM - 2:00 AM' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-24 pb-12">
      {/* Geometric Header */}
      <div className="relative px-8 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative mb-12">
            <div className="bg-white/95 backdrop-blur-sm w-full max-w-xl h-32 transform skew-y-3 shadow-2xl mx-auto">
              <div className="absolute inset-8 border-r-6 border-primary flex items-center justify-center">
                <h1 className="font-orbitron font-black text-4xl md:text-6xl text-foreground transform -skew-y-3 uppercase tracking-wider">
                  INFO
                </h1>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent transform -rotate-12"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary transform rotate-45"></div>
          </div>

          <div className="relative">
            <div className="bg-foreground/90 backdrop-blur-sm w-96 h-16 transform -skew-x-6 mx-auto shadow-xl">
              <div className="absolute inset-4 flex items-center justify-center transform skew-x-6">
                <p className="font-rajdhani text-white text-center uppercase tracking-wider">
                  Everything for the ultimate experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Section - Geometric grid */}
      <section className="relative px-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12">
            <div className="bg-primary w-40 h-16 transform -skew-y-6 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="font-orbitron font-bold text-xl text-white transform skew-y-6 uppercase tracking-wider">
                  TICKETS
                </h2>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {ticketTypes.map((ticket, index) => (
              <div
                key={ticket.name}
                className={`relative transform ${index === 1 ? '-rotate-1' : index === 0 ? 'rotate-1' : 'rotate-2'}`}
              >
                {ticket.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-accent w-32 h-12 transform skew-x-12 shadow-lg">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-rajdhani font-bold text-sm transform -skew-x-12 uppercase tracking-wider">
                          POPULAR
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-white/90 backdrop-blur-sm h-96 shadow-xl">
                  <div className="absolute inset-8 border-b-4 border-primary">
                    <div className="text-center mb-6">
                      <Ticket className="text-primary mx-auto mb-4" size={40} />
                      <h3 className="font-orbitron font-bold text-xl mb-4 text-foreground uppercase tracking-wider">
                        {ticket.name.replace(' ', '\n')}
                      </h3>
                      <div className="text-3xl font-orbitron font-black text-primary mb-6">
                        {ticket.price}
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx} className="font-rajdhani text-foreground/80 flex items-center text-sm">
                          <span className="w-2 h-2 bg-primary mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="absolute bottom-0 left-0 right-0">
                      <div className={`h-12 flex items-center justify-center ${
                        ticket.available
                          ? 'bg-primary hover:bg-primary/90 cursor-pointer'
                          : 'bg-muted cursor-not-allowed'
                      } transition-colors`}>
                        <span className="font-rajdhani font-bold text-white uppercase tracking-wider">
                          {ticket.available ? 'GET TICKETS' : 'SOLD OUT'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-accent transform rotate-45"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section - Geometric blocks */}
      <section className="relative px-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12">
            <div className="bg-secondary w-48 h-14 transform skew-x-12 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="font-orbitron font-bold text-xl text-white transform -skew-x-12 uppercase tracking-wider">
                  SCHEDULE
                </h2>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {schedule.map((day, index) => (
              <div key={day.day} className={`relative transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                <div className="bg-white/90 backdrop-blur-sm h-48 shadow-xl">
                  <div className="absolute inset-6 border-l-4 border-accent text-center">
                    <Clock className="text-accent mx-auto mb-4" size={32} />
                    <h3 className="font-orbitron font-bold text-2xl mb-2 text-foreground uppercase tracking-wider">
                      {day.day}
                    </h3>
                    <p className="font-rajdhani text-lg text-foreground/80 mb-4 uppercase tracking-wide">
                      {day.date}
                    </p>
                    <p className="font-rajdhani text-primary font-medium uppercase tracking-wider">
                      {day.hours}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent transform rotate-45"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section - Geometric mosaic */}
      <section className="relative px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12">
            <div className="bg-accent w-44 h-16 transform -skew-y-6 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="font-orbitron font-bold text-xl text-white transform skew-y-6 uppercase tracking-wider">
                  AMENITIES
                </h2>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Security', desc: '24/7 professional security and medical staff on-site' },
              { icon: Car, title: 'Parking', desc: 'Free parking available with shuttle service to venue' },
              { icon: Utensils, title: 'Food & Drinks', desc: 'Gourmet food trucks and premium bars throughout' },
              { icon: Tent, title: 'Camping', desc: 'On-site camping with shower and restroom facilities' }
            ].map((amenity, index) => (
              <div key={amenity.title} className={`relative transform ${index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? '-rotate-2' : 'rotate-2'}`}>
                <div className="bg-white/90 backdrop-blur-sm h-40 shadow-lg">
                  <div className="absolute inset-6 border-t-4 border-primary text-center">
                    <amenity.icon className="text-primary mx-auto mb-3" size={28} />
                    <h3 className="font-rajdhani font-bold text-lg mb-2 text-foreground uppercase tracking-wider">
                      {amenity.title}
                    </h3>
                    <p className="text-foreground/80 text-xs font-rajdhani leading-relaxed">
                      {amenity.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary transform rotate-45"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bauhaus decorative elements for background reveal */}
      <div className="fixed top-1/4 right-8 w-12 h-24 bg-primary/10 transform rotate-45 pointer-events-none" />
      <div className="fixed bottom-1/3 left-12 w-20 h-8 bg-accent/10 transform -skew-x-12 pointer-events-none" />
      <div className="fixed top-2/3 right-1/4 w-16 h-16 border-2 border-secondary/20 transform rotate-12 pointer-events-none" />
    </div>
  );
};

export default Info;