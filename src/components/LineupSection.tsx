import { useState, useEffect } from 'react';
import { Music, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArtistCard from './ArtistCard';
import './LineupSection.css';

interface Artist {
  id: string;
  name: string;
  genre: string;
  day: string;
  stage: string;
  time: string;
  featured: boolean;
  image?: string;
  personalTouch?: string;
  soundcloud?: string;
  instagram?: string;
  credits?: string;
}

interface ArtistNode {
  id: string;
  title: string;
  artistDetails?: {
    genre?: string;
    day?: string;
    stage?: string;
    time?: string;
    featuredArtist?: boolean;
    profilePhotoUrl?: string;
    personalTouch?: string;
    soundcloud?: string;
    instagram?: string;
    credits?: string;
  };
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
}

interface GraphQLResponse {
  data?: {
    artists?: {
      nodes: ArtistNode[];
    };
  };
  errors?: { message: string }[];
}

const LineupSection = () => {
  const [selectedDay, setSelectedDay] = useState('all');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const wordpressGraphQLEndpoint = 'https://vivalafiasko.de/graphql'; // Replace with your actual WordPress GraphQL endpoint

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const query = `
          query GetArtists {
            artists(first: 100) {
              nodes {
                id
                title
                content
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                artistDetails {
                  genre
                  day
                  stage
                  time
                  featuredArtist
                  profilePhotoUrl
                  instagram
                  soundcloud
                  credits
                  personalTouch
                }
              }
            }
          }
        `;

        const response = await fetch(wordpressGraphQLEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse = await response.json();
        console.log("GraphQL Response:", result); // Log the full response for debugging

        if (result.errors) {
          throw new Error(result.errors.map((err) => err.message).join(', '));
        }

        const nodes = result.data?.artists?.nodes; // Use optional chaining

        if (!Array.isArray(nodes)) {
          throw new Error("Expected 'nodes' to be an array, but received: " + JSON.stringify(nodes));
        }

        const fetchedArtists: Artist[] = nodes.map((node) => ({
          id: node.id,
          name: node.title,
          genre: node.artistDetails?.genre || '',
          day: node.artistDetails?.day || '',
          stage: node.artistDetails?.stage || '',
          time: node.artistDetails?.time || '',
          featured: node.artistDetails?.featuredArtist || false,
          image: node.artistDetails?.profilePhotoUrl || node.featuredImage?.node?.sourceUrl || undefined,
          personalTouch: node.artistDetails?.personalTouch || undefined,
          soundcloud: node.artistDetails?.soundcloud || undefined,
          instagram: node.artistDetails?.instagram || undefined,
          credits: node.artistDetails?.credits || undefined,
        }));
        setArtists(fetchedArtists);

        // Dynamically generate days based on fetched artists
        const uniqueDays = Array.from(new Set(fetchedArtists.map(artist => artist.day))).filter(Boolean);
        setDays(['all', ...uniqueDays.sort()]);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Failed to fetch artists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const [days, setDays] = useState<string[]>(['all']); // Initialize with 'all']

  const filteredArtists = selectedDay === 'all' 
    ? artists 
    : artists.filter(artist => artist.day === selectedDay);

  const featuredArtists = filteredArtists.filter(artist => artist.featured);
  const regularArtists = filteredArtists.filter(artist => !artist.featured);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading artists...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="lineup-section-container">
      {/* Geometric Header */}
      <div className="lineup-header-section">
        <div className="lineup-header-max-width">
          <div className="lineup-header-relative">
            <div className="lineup-header-bg">
              <div className="lineup-header-inner">
                <h1 className="lineup-header-title">
                  LINEUP
                </h1>
              </div>
            </div>
            <div className="lineup-header-accent-bottom-right"></div>
            <div className="lineup-header-accent-top-left"></div>
          </div>

          {/* Subtitle */}
          <div className="lineup-subtitle-section">
            <div className="lineup-subtitle-bg">
              <div className="lineup-subtitle-inner">
                <p className="lineup-subtitle-text">
                  50+ World-Class Artists • 4 Stages
                </p>
              </div>
            </div>
          </div>
          
          {/* Day Filter - Geometric buttons */}
          <div className="lineup-filter-buttons">
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="lineup-filter-button"
              >
                <div className={`lineup-filter-button-bg ${index % 2 === 0 ? 'skew-even' : 'skew-odd'} ${selectedDay === day ? 'selected' : ''}`}>
                  <div className="lineup-filter-button-text-container">
                    <span className={`lineup-filter-button-text ${index % 2 === 0 ? 'skew-even' : 'skew-odd'} ${selectedDay === day ? 'selected' : ''}`}>
                      {day === 'all' ? 'ALL DAYS' : day.toUpperCase()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Artists - Geometric grid */}
      {featuredArtists.length > 0 && (
        <div className="lineup-featured-artists-section">
          <div className="lineup-header-max-width">
            <div className="lineup-featured-artists-header-container">
              <div className="lineup-featured-artists-header-bg">
                <div className="lineup-featured-artists-header-inner">
                  <h2 className="lineup-featured-artists-header-title">
                    HEADLINERS
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="lineup-grid">
              {featuredArtists.map((artist, index) => (
                <ArtistCard key={artist.id} artist={artist} isFeatured={true} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular Artists - Compact geometric layout */}
      {regularArtists.length > 0 && (
        <div className="lineup-regular-artists-section">
          <div className="lineup-header-max-width">
            <div className="lineup-regular-artists-header-container">
              <div className="lineup-regular-artists-header-bg">
                <div className="lineup-regular-artists-header-inner">
                  <h2 className="lineup-regular-artists-header-title">
                    MORE ARTISTS
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="lineup-regular-grid">
              {regularArtists.map((artist, index) => (
                <ArtistCard key={artist.id} artist={artist} isFeatured={false} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bauhaus decorative elements for background reveal */}
      <div className="lineup-decorative-element-1" />
      <div className="lineup-decorative-element-2" />
      <div className="lineup-decorative-element-3" />
    </div>
  );
}

export default LineupSection;
