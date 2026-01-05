    import React from 'react';

const AnimeCard = ({ anime }) => {
  const imageUrl = anime.images?.jpg?.image_url || anime.image_url || '';
  const title = anime.title || anime.name || 'Titre inconnu';
  const score = anime.score ?? 'N/A';
  const episodes = anime.episodes ?? 'À venir';

  return (
    <div
      className="anime-card"
      style={{
        minWidth: '150px',
        marginRight: '12px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        flexShrink: 0,
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div style={{ padding: '8px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px' }}>
          {title.length > 20 ? title.slice(0, 20) + '...' : title}
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#555' }}>Score: {score}</p>
        <p style={{ fontSize: '0.8rem', color: '#555' }}>Épisodes: {episodes}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
