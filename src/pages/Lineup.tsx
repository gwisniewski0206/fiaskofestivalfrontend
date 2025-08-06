import { useState, useEffect } from 'react';
import { Music, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArtistCard from '@/components/ArtistCard';

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

const Lineup = () => {
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
    <div className="relative min-h-screen overflow-hidden pt-24 pb-12">
      {/* Geometric Header */}
      <div className="relative px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12">
            <div className="bg-white/95 backdrop-blur-sm w-full max-w-2xl h-32 transform -skew-y-2 shadow-2xl mx-auto">
              <div className="absolute inset-8 border-b-6 border-primary flex items-center justify-center">
                <h1 className="font-orbitron font-black text-4xl md:text-6xl text-foreground transform skew-y-2 uppercase tracking-wider">
                  LINEUP
                </h1>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent transform rotate-12"></div>
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary transform -rotate-45"></div>
          </div>

          {/* Subtitle */}
          <div className="relative mb-12">
            <div className="bg-foreground/90 backdrop-blur-sm w-80 h-16 transform skew-x-6 mx-auto shadow-xl">
              <div className="absolute inset-4 flex items-center justify-center transform -skew-x-6">
                <p className="font-rajdhani text-white text-center uppercase tracking-wider">
                  50+ World-Class Artists • 4 Stages
                </p>
              </div>
            </div>
          </div>
          
          {/* Day Filter - Geometric buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative ${selectedDay === day ? 'selected' : ''}`}
              >
                <div className={`w-32 h-12 transform ${index % 2 === 0 ? 'skew-x-12' : '-skew-x-12'} shadow-lg transition-all duration-300 hover:scale-105 ${
                  selectedDay === day 
                    ? 'bg-primary' 
                    : 'bg-white/90 backdrop-blur-sm border-2 border-primary'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-rajdhani font-bold text-sm uppercase tracking-wider transform ${index % 2 === 0 ? '-skew-x-12' : 'skew-x-12'} ${
                      selectedDay === day ? 'text-white' : 'text-primary'
                    }`}>
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
        <div className="relative px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="relative mb-12">
              <div className="bg-primary w-48 h-16 transform -skew-y-6 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="font-orbitron font-bold text-xl text-white transform skew-y-6 uppercase tracking-wider">
                    HEADLINERS
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtists.map((artist, index) => (
                <ArtistCard key={artist.id} artist={artist} isFeatured={true} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular Artists - Compact geometric layout */}
      {regularArtists.length > 0 && (
        <div className="relative px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="relative mb-12">
              <div className="bg-secondary w-40 h-12 transform skew-x-12 shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="font-orbitron font-bold text-lg text-white transform -skew-x-12 uppercase tracking-wider">
                    MORE ARTISTS
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regularArtists.map((artist, index) => (
                <ArtistCard key={artist.id} artist={artist} isFeatured={false} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bauhaus decorative elements for background reveal */}
      <div className="fixed top-1/4 right-8 w-12 h-24 bg-primary/10 transform rotate-45 pointer-events-none" />
      <div className="fixed bottom-1/3 left-12 w-20 h-8 bg-accent/10 transform -skew-x-12 pointer-events-none" />
      <div className="fixed top-2/3 right-1/4 w-16 h-16 border-2 border-secondary/20 transform rotate-12 pointer-events-none" />
    </div>
  );
};

export default Lineup;