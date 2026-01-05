import React from 'react';
// import HeroSection from './HeroSection';
import AnimeSection from '../components/layouts/AnimeSection';
// import BottomNav from './BottomNav';

const Home = () => {
  return (
    <div style={{ padding: '16px' }}>
      {/* <HeroSection /> */}
      <AnimeSection title="Tendance actuelle" type="trending" limit={5} />
      <AnimeSection title="Action" genre={1} limit={5} />
      <AnimeSection title="Romance" genre={22} limit={5} />
      <AnimeSection title="Comédie" genre={4} limit={5} />
      <AnimeSection title="Nouveautés" type="season" limit={5} />
      <AnimeSection title="Les mieux notés" type="top" limit={5} />
      {/* <BottomNav /> */}
    </div>
  );
};

export default Home;
