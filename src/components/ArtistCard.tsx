import { Music, Clock, Star, Instagram, Headphones } from 'lucide-react';
import { Artist } from '../pages/Lineup';
import { useState } from 'react';
import './ArtistCard.css';

interface ArtistCardProps {
  artist: Artist;
  isFeatured: boolean;
  index: number;
  isVisible: boolean;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, isFeatured, index, isVisible }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (isFeatured) {
    return (
      <div
        key={artist.id}
        className={`artist-card-featured-container ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
      >
        <div className="artist-card-featured-bg">
          <div className="artist-card-featured-inner">
            <div className="artist-card-featured-header">
              <Star className="artist-card-featured-star-icon" size={24} />
              <span className="artist-card-featured-day-text">
                {artist.day}
              </span>
            </div>
            <h3 className="artist-card-featured-name">
              {artist.name}
            </h3>
            <p className="artist-card-featured-genre">
              {artist.genre}
            </p>
            <div className="artist-card-featured-details">
              <div className="artist-card-featured-detail-item">
                <Music size={14} className="artist-card-featured-detail-icon" />
                <span className="artist-card-featured-detail-text">{artist.stage}</span>
              </div>
              <div className="artist-card-featured-detail-item">
                <Clock size={14} className="artist-card-featured-detail-icon" />
                <span className="artist-card-featured-detail-text">{artist.time}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="artist-card-featured-accent-bottom"></div>
      </div>
    );
  }

  return (
    <div
      key={artist.id}
      className={`flip-card ${index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? '-rotate-1' : 'rotate-2'} group ${isVisible ? 'is-visible' : ''}`}
      onClick={handleCardClick}
    >
      <div className={`flip-card-inner h-full ${isFlipped ? 'is-flipped' : ''} group-hover:is-flipped`}>
        {/* Front of the card */}
        <div className="flip-card-front">
          {artist.image && (
            <img src={artist.image} alt={artist.name} />
          )}
          <div className="flip-card-front-content">
            <div className="flip-card-front-header">
              <span className="flip-card-front-day-text">
                {artist.day}
              </span>
              <span className="flip-card-front-time-text">
                {artist.time}
              </span>
            </div>
            <h3 className="flip-card-front-name">
              {artist.name}
            </h3>
            <p className="flip-card-front-genre">
              {artist.genre}
            </p>
            <p className="flip-card-front-stage">
              {artist.stage}
            </p>
          </div>
          <div className="flip-card-front-accent-bottom"></div>
        </div>
        {/* Back of the card */}
        <div className="flip-card-back">
          {artist.personalTouch && (
            <p className="flip-card-back-personal-touch">{artist.personalTouch}</p>
          )}
          {artist.soundcloud && (
            <a href={artist.soundcloud} target="_blank" rel="noopener noreferrer" className="flip-card-back-link">
              <Headphones size={16} className="flip-card-back-icon" /> SoundCloud
            </a>
          )}
          {artist.instagram && (
            <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="flip-card-back-link">
              <Instagram size={16} className="flip-card-back-icon" /> Instagram
            </a>
          )}
          {artist.credits && (
            <p className="flip-card-back-credits">Credits: {artist.credits}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
