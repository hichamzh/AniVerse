// src/components/layouts/AnimeSection.jsx
import React from 'react';
import AnimeCard from './AnimeCard';

const SkeletonCard = () => (
  <div className="w-40 h-60 bg-gray-300 animate-pulse rounded-lg mr-2" />
);

const AnimeSection = ({ title, data = [], loading = false, showSkeleton = 5 }) => {
  return (
    <div className="anime-section mb-6">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <div className="flex overflow-x-auto pb-2">
        {loading
          ? Array.from({ length: showSkeleton }).map((_, i) => <SkeletonCard key={i} />)
          : data.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
      </div>
    </div>
  );
};

export default AnimeSection;
