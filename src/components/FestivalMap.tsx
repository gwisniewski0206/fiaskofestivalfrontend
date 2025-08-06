import { useState } from 'react';
import { Music, Utensils, Car, Tent, Heart, ShieldCheck, LucideIcon } from 'lucide-react';
import MapSFC from './MapSFC';

interface POI {
  id: number;
  name: string;
  type: 'stage' | 'food' | 'parking' | 'camping' | 'medical' | 'security';
  position: { x: number; y: number }; // SVG coordinates
  description: string;
  icon: LucideIcon;
}

const FestivalMap = () => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  const pois: POI[] = [
    {
      id: 1,
      name: 'Main Stage',
      type: 'stage',
      position: { x: 400, y: 180 },
      description: 'The primary stage featuring headlining acts and major performances throughout the festival.',
      icon: Music
    },
    {
      id: 2,
      name: 'Techno Arena',
      type: 'stage',
      position: { x: 650, y: 220 },
      description: 'Underground techno beats and industrial sounds. Home to the hardest hitting DJs.',
      icon: Music
    },
    {
      id: 3,
      name: 'Trance Temple',
      type: 'stage',
      position: { x: 150, y: 200 },
      description: 'Ethereal trance melodies and uplifting beats. A spiritual journey through sound.',
      icon: Music
    },
    {
      id: 4,
      name: 'Underground Stage',
      type: 'stage',
      position: { x: 300, y: 370 },
      description: 'Intimate setting for experimental and underground electronic music.',
      icon: Music
    },
    {
      id: 5,
      name: 'Food Court',
      type: 'food',
      position: { x: 505, y: 305 },
      description: 'Gourmet food trucks and vendors offering cuisine from around the world.',
      icon: Utensils
    },
    {
      id: 6,
      name: 'VIP Dining',
      type: 'food',
      position: { x: 230, y: 320 },
      description: 'Exclusive dining experience for VIP ticket holders with premium menu options.',
      icon: Utensils
    },
    {
      id: 7,
      name: 'Main Parking',
      type: 'parking',
      position: { x: 120, y: 420 },
      description: 'Primary parking area with shuttle service to the festival grounds.',
      icon: Car
    },
    {
      id: 8,
      name: 'VIP Parking',
      type: 'parking',
      position: { x: 700, y: 385 },
      description: 'Reserved parking for VIP ticket holders with direct venue access.',
      icon: Car
    },
    {
      id: 9,
      name: 'General Camping',
      type: 'camping',
      position: { x: 150, y: 75 },
      description: 'General camping area with restroom and shower facilities nearby.',
      icon: Tent
    },
    {
      id: 10,
      name: 'VIP Camping',
      type: 'camping',
      position: { x: 640, y: 75 },
      description: 'Premium camping with upgraded facilities and closer venue access.',
      icon: Tent
    },
    {
      id: 11,
      name: 'Medical Tent',
      type: 'medical',
      position: { x: 400, y: 340 },
      description: '24/7 medical assistance with qualified paramedics and first aid supplies.',
      icon: Heart
    },
    {
      id: 12,
      name: 'Security Hub',
      type: 'security',
      position: { x: 380, y: 270 },
      description: 'Main security office for reporting incidents and lost items.',
      icon: ShieldCheck
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'stage': return '#3B82F6'; // Blue
      case 'food': return '#EF4444'; // Red
      case 'parking': return '#06B6D4'; // Cyan
      case 'camping': return '#10B981'; // Emerald
      case 'medical': return '#F59E0B'; // Amber
      case 'security': return '#8B5CF6'; // Violet
      default: return '#3B82F6';
    }
  };

  const getLegendItems = () => [
    { type: 'stage', label: 'Stages', icon: Music },
    { type: 'food', label: 'Food & Drinks', icon: Utensils },
    { type: 'parking', label: 'Parking', icon: Car },
    { type: 'camping', label: 'Camping', icon: Tent },
    { type: 'medical', label: 'Medical', icon: Heart },
    { type: 'security', label: 'Security', icon: ShieldCheck }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Geometric legend - Bauhaus style */}
      <div className="absolute top-8 left-8 max-w-xs z-20">
        <div className="relative">
          <div className="bg-white/95 backdrop-blur-sm w-72 h-36 transform -skew-y-2 shadow-xl">
            <div className="absolute inset-6 border-l-4 border-primary">
              <h3 className="font-orbitron font-bold text-lg mb-4 text-foreground transform skew-y-2 uppercase tracking-wider">
                FESTIVAL MAP
              </h3>
              <div className="grid grid-cols-2 gap-3 transform skew-y-2">
                {getLegendItems().map(({ type, label, icon: IconComponent }) => (
                  <div key={type} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 transform rotate-45"
                      style={{ backgroundColor: getIconColor(type) }}
                    />
                    <span className="font-rajdhani text-xs text-foreground/80 uppercase tracking-wide">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-accent transform rotate-45"></div>
        </div>
      </div>

      {/* Main interactive map - architectural framing */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-16">
        <div className="relative max-w-6xl w-full">
          <div className="bg-white/90 backdrop-blur-sm transform -rotate-1 shadow-2xl">
            <div className="relative bg-gradient-to-br from-green-50/90 to-blue-50/90 p-6 overflow-auto border-l-8 border-primary">
              <MapSFC 
                pois={pois}
                selectedPOI={selectedPOI}
                getIconColor={getIconColor}
                onPoiClick={(poi) => setSelectedPOI(selectedPOI?.id === poi.id ? null : poi)}
              />
            </div>
          </div>
          {/* Geometric accent elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent transform rotate-12"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary transform -rotate-45"></div>
        </div>
      </div>

      {/* Geometric POI details - architectural positioning */}
      {selectedPOI && (
        <div className="fixed bottom-8 right-8 max-w-md z-30 transform transition-all duration-500 ease-out">
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-sm w-80 h-48 transform rotate-1 shadow-2xl">
              <div className="absolute inset-6 border-b-4" style={{ borderColor: getIconColor(selectedPOI.type) }}>
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 transform rotate-45 flex items-center justify-center"
                    style={{ backgroundColor: getIconColor(selectedPOI.type) }}
                  >
                    <selectedPOI.icon 
                      size={20} 
                      className="text-white transform -rotate-45"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-orbitron font-bold text-lg mb-2 text-foreground uppercase tracking-wider">
                      {selectedPOI.name}
                    </h3>
                    <p className="font-rajdhani text-foreground/80 text-xs leading-relaxed mb-2">
                      {selectedPOI.description}
                    </p>
                    <div className="text-xs text-foreground/60">
                      <span className="bg-foreground/10 px-2 py-1 uppercase tracking-widest font-rajdhani">
                        {selectedPOI.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent transform rotate-45"></div>
            <button
              onClick={() => setSelectedPOI(null)}
              className="absolute top-2 right-2 w-6 h-6 bg-foreground/20 text-foreground hover:bg-foreground/40 transition-colors text-sm flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Bauhaus geometric decorations for background reveal */}
      <div className="fixed top-1/4 left-4 w-12 h-24 bg-primary/15 transform rotate-45 pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-20 h-8 bg-accent/15 transform -skew-x-12 pointer-events-none" />
      <div className="fixed top-2/3 left-1/4 w-16 h-16 border-2 border-primary/20 transform rotate-12 pointer-events-none" />
    </div>
  );
};

export default FestivalMap;