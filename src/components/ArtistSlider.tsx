import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import ArtistCard from './ArtistCard';
import './ArtistSlider.css';

interface CustomAutoScrollOptions {
  speed?: number;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
  stopOnFocusIn?: boolean;
}

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
    soundcloud?: string;
    instagram?: string;
    credits?: string;
    personalTouch?: string;
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

const ArtistSlider: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
      slidesToScroll: 1,
    },
    [AutoScroll({ speed: 0.5, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true } as CustomAutoScrollOptions)]
  );

  const wordpressGraphQLEndpoint = 'https://vivalafiasko.de/graphql';

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      setError(null);
      console.log("ArtistSlider: Fetching artists...");
      try {
        const query = `
          query GetSliderArtists {
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
        console.log("ArtistSlider: GraphQL Response:", result);

        if (result.errors) {
          throw new Error(result.errors.map((err) => err.message).join(', '));
        }

        const nodes = result.data?.artists?.nodes;
        console.log("ArtistSlider: Nodes from GraphQL:", nodes);

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

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("ArtistSlider: Failed to fetch artists:", err);
      } finally {
        setLoading(false);
        console.log("ArtistSlider: Loading state:", loading);
        console.log("ArtistSlider: Error state:", error);
        console.log("ArtistSlider: Artists state:", artists);
      }
    };

    fetchArtists();
  }, []);

  console.log("ArtistSlider: Render - Loading:", loading, "Error:", error, "Artists:", artists);

  if (loading) {
    return <div className="text-white">Loading artists for slider...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading artists: {error}</div>;
  }

  if (artists.length === 0) {
    return <div className="text-white">No artists found for slider.</div>;
  }

  return (
    <div className="artist-slider-container">
      <div className="embla" ref={emblaRef}
        onMouseEnter={() => emblaApi && emblaApi.plugins().autoScroll.stop()}
        onMouseLeave={() => emblaApi && emblaApi.plugins().autoScroll.play()}
      >
        <div className="embla__container">
          {artists.map((artist, index) => (
            <div className="embla__slide" key={artist.id}>
              <ArtistCard artist={artist} isFeatured={false} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistSlider;