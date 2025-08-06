import { POI } from './FestivalMap';

interface MapSFCProps {
  pois: POI[];
  selectedPOI: POI | null;
  getIconColor: (type: string) => string;
  onPoiClick: (poi: POI) => void;
}

const MapSFC: React.FC<MapSFCProps> = ({ pois, selectedPOI, getIconColor, onPoiClick }) => {
  return (
    <svg 
      viewBox="0 0 800 500" 
      className="w-full h-auto"
      style={{ minHeight: '500px' }}
    >
      <defs>
        <pattern id="grassPattern" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="#86efac"/>
          <circle cx="2" cy="2" r="0.5" fill="#4ade80" opacity="0.6"/>
          <circle cx="6" cy="6" r="0.3" fill="#22c55e" opacity="0.4"/>
        </pattern>
        <pattern id="pathPattern" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="#f3f4f6"/>
          <rect width="1" height="4" x="1.5" fill="#e5e7eb"/>
        </pattern>
        <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="20" height="20">
          <rect width="20" height="20" fill="#3b82f6"/>
          <circle cx="5" cy="5" r="2" fill="#60a5fa" opacity="0.5"/>
          <circle cx="15" cy="15" r="1.5" fill="#93c5fd" opacity="0.7"/>
        </pattern>
        <pattern id="sandPattern" patternUnits="userSpaceOnUse" width="6" height="6">
          <rect width="6" height="6" fill="#fbbf24"/>
          <circle cx="2" cy="3" r="0.5" fill="#f59e0b" opacity="0.5"/>
          <circle cx="4" cy="1" r="0.3" fill="#d97706" opacity="0.6"/>
        </pattern>
        <radialGradient id="mainStageGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="stageGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
        </radialGradient>
        <g id="tree">
          <circle cx="0" cy="0" r="8" fill="#22c55e"/>
          <rect x="-1" y="0" width="2" height="6" fill="#92400e"/>
          <circle cx="-3" cy="-3" r="4" fill="#16a34a" opacity="0.8"/>
          <circle cx="3" cy="-2" r="3" fill="#16a34a" opacity="0.8"/>
        </g>
      </defs>
      <rect width="800" height="500" fill="url(#grassPattern)" rx="15"/>
      <ellipse cx="150" cy="450" rx="80" ry="30" fill="url(#waterPattern)" opacity="0.8"/>
      <ellipse cx="650" cy="480" rx="60" ry="20" fill="url(#waterPattern)" opacity="0.8"/>
      <ellipse cx="400" cy="180" rx="120" ry="80" fill="url(#sandPattern)" opacity="0.6"/>
      <ellipse cx="650" cy="220" rx="90" ry="70" fill="url(#sandPattern)" opacity="0.6"/>
      <ellipse cx="150" cy="200" rx="80" ry="60" fill="url(#sandPattern)" opacity="0.6"/>
      <path d="M 50 250 Q 200 220, 400 250 Q 600 280, 750 250" 
            stroke="url(#pathPattern)" strokeWidth="20" fill="none"/>
      <path d="M 400 30 L 400 470" 
            stroke="url(#pathPattern)" strokeWidth="16" fill="none"/>
      <path d="M 100 100 L 700 380" 
            stroke="url(#pathPattern)" strokeWidth="12" fill="none"/>
      <path d="M 700 100 L 100 380" 
            stroke="url(#pathPattern)" strokeWidth="10" fill="none"/>
      <path d="M 200 100 Q 300 150, 500 120 Q 600 100, 700 130" 
            stroke="#d1d5db" strokeWidth="8" fill="none" opacity="0.8"/>
      <path d="M 100 300 Q 200 350, 400 320 Q 600 300, 700 330" 
            stroke="#d1d5db" strokeWidth="8" fill="none" opacity="0.8"/>
      <use href="#tree" transform="translate(80, 80)" opacity="0.8"/>
      <use href="#tree" transform="translate(120, 60)" opacity="0.7"/>
      <use href="#tree" transform="translate(60, 120)" opacity="0.9"/>
      <use href="#tree" transform="translate(720, 70)" opacity="0.8"/>
      <use href="#tree" transform="translate(700, 110)" opacity="0.7"/>
      <use href="#tree" transform="translate(750, 90)" opacity="0.8"/>
      <use href="#tree" transform="translate(80, 380)" opacity="0.8"/>
      <use href="#tree" transform="translate(120, 420)" opacity="0.7"/>
      <use href="#tree" transform="translate(700, 400)" opacity="0.8"/>
      <use href="#tree" transform="translate(730, 430)" opacity="0.7"/>
      <g>
        <ellipse cx="400" cy="180" rx="60" ry="40" fill="url(#mainStageGlow)"/>
        <rect x="340" y="150" width="120" height="60" fill="#1f2937" stroke="#3b82f6" strokeWidth="3" rx="8"/>
        <rect x="350" y="160" width="100" height="40" fill="#374151" stroke="#60a5fa" strokeWidth="2" rx="4"/>
        <text x="400" y="185" fill="#3b82f6" fontSize="10" textAnchor="middle" className="font-rajdhani font-bold">MAIN STAGE</text>
        <circle cx="650" cy="220" r="45" fill="url(#stageGlow)"/>
        <circle cx="650" cy="220" r="35" fill="#1f2937" stroke="#6366f1" strokeWidth="3"/>
        <circle cx="650" cy="220" r="25" fill="#374151" stroke="#8b5cf6" strokeWidth="2"/>
        <text x="650" y="225" fill="#6366f1" fontSize="9" textAnchor="middle" className="font-rajdhani font-bold">TECHNO</text>
        <polygon points="120,170 180,170 150,240" fill="url(#stageGlow)"/>
        <polygon points="130,180 170,180 150,220" fill="#1f2937" stroke="#8b5cf6" strokeWidth="3"/>
        <text x="150" y="205" fill="#8b5cf6" fontSize="8" textAnchor="middle" className="font-rajdhani font-bold">TRANCE</text>
        <ellipse cx="300" cy="370" rx="55" ry="35" fill="#0f172a" stroke="#475569" strokeWidth="3"/>
        <ellipse cx="300" cy="370" rx="40" ry="25" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
        <text x="300" y="375" fill="#94a3b8" fontSize="8" textAnchor="middle" className="font-rajdhani font-bold">UNDERGROUND</text>
      </g>
      <g>
        <rect x="80" y="30" width="140" height="90" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" rx="12" opacity="0.8"/>
        <text x="150" y="50" fill="#15803d" fontSize="12" textAnchor="middle" className="font-rajdhani font-bold">GENERAL CAMPING</text>
        <rect x="580" y="40" width="120" height="70" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" rx="12" opacity="0.9"/>
        <text x="640" y="60" fill="#d97706" fontSize="12" textAnchor="middle" className="font-rajdhani font-bold">VIP CAMPING</text>
      </g>
      <g>
        <rect x="30" y="380" width="180" height="80" fill="#e0f2fe" stroke="#0891b2" strokeWidth="3" rx="8" opacity="0.8"/>
        <text x="120" y="405" fill="#0c4a6e" fontSize="14" textAnchor="middle" className="font-rajdhani font-bold">MAIN PARKING</text>
        <text x="120" y="420" fill="#0c4a6e" fontSize="10" textAnchor="middle" className="font-rajdhani">Shuttle Service</text>
        <rect x="630" y="350" width="140" height="70" fill="#fdf4ff" stroke="#a855f7" strokeWidth="3" rx="8" opacity="0.9"/>
        <text x="700" y="375" fill="#7c3aed" fontSize="12" textAnchor="middle" className="font-rajdhani font-bold">VIP PARKING</text>
        <text x="700" y="390" fill="#7c3aed" fontSize="9" textAnchor="middle" className="font-rajdhani">Direct Access</text>
      </g>
      <g>
        <rect x="450" y="270" width="110" height="70" fill="#fef2f2" stroke="#dc2626" strokeWidth="3" rx="12" opacity="0.8"/>
        <text x="505" y="295" fill="#b91c1c" fontSize="11" textAnchor="middle" className="font-rajdhani font-bold">FOOD COURT</text>
        <text x="505" y="308" fill="#b91c1c" fontSize="8" textAnchor="middle" className="font-rajdhani">Global Cuisine</text>
        <rect x="180" y="290" width="100" height="60" fill="#fff7ed" stroke="#ea580c" strokeWidth="3" rx="12" opacity="0.8"/>
        <text x="230" y="315" fill="#c2410c" fontSize="10" textAnchor="middle" className="font-rajdhani font-bold">VIP DINING</text>
        <text x="230" y="328" fill="#c2410c" fontSize="8" textAnchor="middle" className="font-rajdhani">Premium Menu</text>
      </g>
      <g>
        <circle cx="400" cy="340" r="25" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" opacity="0.9"/>
        <text x="400" y="345" fill="#d97706" fontSize="9" textAnchor="middle" className="font-rajdhani font-bold">MEDICAL</text>
        <polygon points="395,335 405,335 400,330" fill="#dc2626"/>
        <rect x="398" y="330" width="4" height="10" fill="#dc2626"/>
        <rect x="340" y="240" width="80" height="60" fill="#f3e8ff" stroke="#8b5cf6" strokeWidth="3" rx="12" opacity="0.8"/>
        <text x="380" y="265" fill="#7c3aed" fontSize="10" textAnchor="middle" className="font-rajdhani font-bold">SECURITY</text>
        <text x="380" y="278" fill="#7c3aed" fontSize="8" textAnchor="middle" className="font-rajdhani">Command Center</text>
      </g>
      {pois.map((poi) => {
        const IconComponent = poi.icon;
        return (
          <g key={poi.id}>
            {selectedPOI?.id === poi.id && (
              <circle 
                cx={poi.position.x} 
                cy={poi.position.y} 
                r="30" 
                fill={getIconColor(poi.type)} 
                opacity="0.3" 
                className="animate-pulse"
              />
            )}
            <circle
              cx={poi.position.x}
              cy={poi.position.y}
              r="18"
              fill={getIconColor(poi.type)}
              stroke="white"
              strokeWidth="3"
              className="cursor-pointer hover:r-22 transition-all duration-300 drop-shadow-xl"
              style={{
                filter: `drop-shadow(0 0 12px ${getIconColor(poi.type)}80)`
              }}
              onClick={() => onPoiClick(poi)}
            />
            <circle
              cx={poi.position.x}
              cy={poi.position.y}
              r="10"
              fill="white"
              className="cursor-pointer pointer-events-none"
            />
            <text
              x={poi.position.x}
              y={poi.position.y + 40}
              fill="white"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              className="font-rajdhani pointer-events-none"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            >
              {poi.name}
            </text>
          </g>
        );
      })}
      <g transform="translate(750, 40)">
        <circle cx="0" cy="0" r="25" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
        <polygon points="0,-15 -8,10 8,10" fill="#3b82f6"/>
        <text x="0" y="30" fill="white" fontSize="10" textAnchor="middle" className="font-rajdhani font-bold">N</text>
      </g>
    </svg>
  );
};

export default MapSFC;