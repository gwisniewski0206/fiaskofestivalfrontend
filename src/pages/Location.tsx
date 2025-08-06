import { MapPin, Car, Plane, Train } from 'lucide-react';
import FestivalMap from '@/components/FestivalMap';

const Location = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Bauhaus geometric header - angular composition */}
      <div className="absolute top-24 left-8 z-20">
        <div className="relative">
          {/* Primary geometric shape */}
          <div className="bg-white/90 backdrop-blur-sm w-80 h-32 transform -skew-y-3 shadow-2xl">
            <div className="absolute inset-4 border-l-4 border-primary">
              <h1 className="font-orbitron font-black text-4xl md:text-5xl text-foreground transform skew-y-3 pt-2">
                LOCATION
              </h1>
            </div>
          </div>
          
          {/* Secondary geometric accent */}
          <div className="absolute -right-8 top-8 bg-primary w-24 h-16 transform rotate-12"></div>
          
          {/* Subtitle on separate geometric plane */}
          <div className="absolute top-20 left-12 bg-foreground/90 backdrop-blur-sm px-6 py-2 transform -rotate-1">
            <p className="font-rajdhani text-sm text-white tracking-wider">
              DIGITAL DUNES, NEVADA
            </p>
          </div>
        </div>
      </div>

      {/* Geometric address block - architectural positioning */}
      <div className="absolute top-1/3 right-16 z-20">
        <div className="relative">
          {/* Main address block */}
          <div className="bg-white/85 backdrop-blur-sm w-64 h-40 transform rotate-2 shadow-xl">
            <div className="absolute inset-6 border-b-2 border-primary">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-primary transform rotate-45 mr-3"></div>
                <h2 className="font-rajdhani font-bold text-lg text-foreground">ADDRESS</h2>
              </div>
              <div className="text-foreground/80 text-sm space-y-1 font-rajdhani">
                <p>1234 ELECTRONIC AVENUE</p>
                <p>DIGITAL DUNES, NV 89123</p>
                <p>UNITED STATES</p>
              </div>
            </div>
          </div>
          
          {/* Geometric accent corner */}
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent transform -rotate-45"></div>
        </div>
      </div>

      {/* Main interactive map - positioned organically */}
      <div className="relative mt-32 mb-20">
        <FestivalMap />
      </div>

      {/* Transportation section - Bauhaus grid composition */}
      <div className="relative px-8 pb-16">
        <div className="absolute top-0 right-32">
          <div className="relative">
            <div className="bg-foreground w-48 h-12 transform -skew-x-12"></div>
            <h2 className="absolute inset-0 flex items-center justify-center font-orbitron font-bold text-xl text-white transform skew-x-12">
              TRANSPORTATION
            </h2>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Car - geometric composition */}
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm h-72 transform -rotate-1 shadow-xl">
              <div className="absolute inset-6 border-r-4 border-primary">
                <div className="w-12 h-12 bg-primary transform rotate-45 mb-6"></div>
                <Car className="text-foreground mb-4" size={40} />
                <h3 className="font-rajdhani font-bold text-xl mb-4 text-foreground uppercase tracking-wider">By Car</h3>
                <p className="text-foreground/80 mb-4 text-sm">
                  Free parking with shuttle service to festival grounds.
                </p>
                <div className="space-y-1 text-xs text-foreground/70 font-rajdhani">
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>LAS VEGAS: 45 MIN</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>LOS ANGELES: 4 HRS</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>PHOENIX: 5 HRS</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-accent transform rotate-12"></div>
          </div>
          
          {/* Air - central geometric block */}
          <div className="relative lg:translate-y-4">
            <div className="bg-white/90 backdrop-blur-sm h-72 transform rotate-1 shadow-xl">
              <div className="absolute inset-6 border-l-4 border-accent">
                <div className="w-12 h-12 bg-accent transform -rotate-45 mb-6"></div>
                <Plane className="text-foreground mb-4" size={40} />
                <h3 className="font-rajdhani font-bold text-xl mb-4 text-foreground uppercase tracking-wider">By Air</h3>
                <p className="text-foreground/80 mb-4 text-sm">
                  McCarran International Airport with festival shuttle.
                </p>
                <div className="space-y-1 text-xs text-foreground/70 font-rajdhani">
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>FESTIVAL SHUTTLE</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>RENTAL CARS</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>RIDESHARE ZONES</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-primary transform -rotate-12"></div>
          </div>
          
          {/* Transit - angular composition */}
          <div className="relative lg:translate-y-12">
            <div className="bg-white/90 backdrop-blur-sm h-72 transform -rotate-2 shadow-xl">
              <div className="absolute inset-6 border-t-4 border-secondary">
                <div className="w-12 h-12 bg-secondary mb-6"></div>
                <Train className="text-foreground mb-4" size={40} />
                <h3 className="font-rajdhani font-bold text-xl mb-4 text-foreground uppercase tracking-wider">Transit</h3>
                <p className="text-foreground/80 mb-4 text-sm">
                  Limited public transport. Rideshare recommended.
                </p>
                <div className="space-y-1 text-xs text-foreground/70 font-rajdhani">
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>UBER / LYFT</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>GROUP SHUTTLES</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-foreground mr-2"></div>VEGAS BUS</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 right-0 w-16 h-16 bg-accent transform rotate-45 opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Accommodation section - architectural grid */}
      <div className="relative px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="absolute top-0 left-16">
            <div className="relative">
              <div className="bg-primary w-32 h-16 transform skew-y-6"></div>
              <h2 className="absolute inset-0 flex items-center justify-center font-orbitron font-bold text-lg text-white transform -skew-y-6">
                STAY
              </h2>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Camping - brutalist composition */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-sm h-80 transform rotate-1 shadow-2xl">
                <div className="absolute inset-8 border-b-4 border-primary">
                  <div className="flex items-center mb-6">
                    <div className="w-6 h-12 bg-primary mr-4"></div>
                    <h3 className="font-orbitron font-bold text-2xl text-foreground uppercase tracking-wider">
                      Camping
                    </h3>
                  </div>
                  <p className="text-foreground/80 mb-6 text-sm leading-relaxed">
                    Experience the full festival lifestyle. Wake up to the sounds 
                    of the festival and never miss a beat.
                  </p>
                  <div className="space-y-3 text-xs font-rajdhani">
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-foreground mr-3"></div>
                      <span className="text-foreground/80 uppercase tracking-wide">GENERAL CAMPING AVAILABLE</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-foreground mr-3"></div>
                      <span className="text-foreground/80 uppercase tracking-wide">VIP CAMPING + AMENITIES</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-foreground mr-3"></div>
                      <span className="text-foreground/80 uppercase tracking-wide">SHOWER & RESTROOM FACILITIES</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-foreground mr-3"></div>
                      <span className="text-foreground/80 uppercase tracking-wide">24/7 SECURITY & LIGHTING</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent transform -rotate-45"></div>
            </div>
            
            {/* Hotels - geometric intersections */}
            <div className="relative lg:translate-y-8">
              <div className="bg-white/90 backdrop-blur-sm h-80 transform -rotate-1 shadow-2xl">
                <div className="absolute inset-8 border-l-4 border-accent">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-6 bg-accent mr-4 transform -skew-x-12"></div>
                    <h3 className="font-orbitron font-bold text-2xl text-foreground uppercase tracking-wider">
                      Hotels
                    </h3>
                  </div>
                  <p className="text-foreground/80 mb-6 text-sm leading-relaxed">
                    Partner accommodations with special rates and 
                    shuttle service to the festival grounds.
                  </p>
                  <div className="space-y-3 text-xs font-rajdhani">
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-foreground mr-3"></div>
                      <span className="text-foreground/80 uppercase tracking-wide">PARTNER HOTEL DISCOUNTS</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-foreground mr-3"></div>
                      <span className="text-foreground/80 uppercase tracking-wide">DAILY SHUTTLE SERVICE</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-foreground mr-3"></div>
                      <span className="text-foreground/80 uppercase tracking-wide">15-30 MIN FROM VENUE</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-foreground mr-3"></div>
                      <span className="text-foreground/80 uppercase tracking-wide">POOL & SPA AMENITIES</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary transform rotate-12"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bauhaus geometric decorations for background reveal */}
      <div className="fixed top-1/4 left-4 w-12 h-24 bg-primary/10 transform rotate-45 pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-20 h-8 bg-accent/10 transform -skew-x-12 pointer-events-none" />
      <div className="fixed top-2/3 left-1/4 w-16 h-16 border-2 border-primary/20 transform rotate-12 pointer-events-none" />
      <div className="fixed top-1/2 right-8 w-8 h-20 bg-secondary/15 pointer-events-none" />
    </div>
  );
};

export default Location;