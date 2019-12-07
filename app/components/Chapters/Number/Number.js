import React from 'react'

export default function Number({ chapter, activeChapter, setActive }) {
    return (
      <button
        className={`chapter ${activeChapter === chapter ? 'active-chapter' : ''}`}
        onClick={() => setActive(chapter)}
      >
        {chapter}
      </button>
    );
}