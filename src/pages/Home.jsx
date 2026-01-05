// src/pages/Home.jsx
import React from 'react';
// import HeroSection from '../components/layouts/HeroSection';
import AnimeSection from '../components/layouts/AnimeSection';
// import HeroAnimeCard from '../components/layouts/HeroAnimeCard';
// import BottomNav from '../components/layouts/BottomNav';
import { useAnime } from '../hooks/useAnime';
import HeroSlider from '../components/layouts/HeroSlider';

const Home = () => {
  // Featured anime (top 1)
  const { data: featuredData, loading: loadingFeatured } = useAnime({ type: 'trending', limit: 1 });
  const featured = featuredData[0];

  // Sections avec throttle + skeleton
  const { data: trending, loading: loadingTrending } = useAnime({ type: 'trending', limit: 5 });
  const { data: action, loading: loadingAction } = useAnime({ type: 'genre', genre: 1, limit: 5 });
  const { data: romance, loading: loadingRomance } = useAnime({ type: 'genre', genre: 22, limit: 5 });
  const { data: comedy, loading: loadingComedy } = useAnime({ type: 'genre', genre: 4, limit: 5 });
  const { data: season, loading: loadingSeason } = useAnime({ type: 'season', limit: 5 });
  const { data: top, loading: loadingTop } = useAnime({ type: 'top', limit: 5 });

  return (
    <div className="p-4">
      {/* Featured anime */}
     <HeroSlider />

      {/* <HeroSection /> */}

      {/* Sections avec skeleton */}
      <AnimeSection title="Tendance actuelle" data={trending} loading={loadingTrending} />
      <AnimeSection title="Action" data={action} loading={loadingAction} />
      <AnimeSection title="Romance" data={romance} loading={loadingRomance} />
      <AnimeSection title="Comédie" data={comedy} loading={loadingComedy} />
      <AnimeSection title="Nouveautés" data={season} loading={loadingSeason} />
      <AnimeSection title="Les mieux notés" data={top} loading={loadingTop} />

      {/* <BottomNav /> */}
    </div>
  );
};

export default Home;
