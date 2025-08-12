import React from 'react';
import Hero from './hero/Hero';
import MediaMention from './mediamention/MediaMention';
import MainIntro from './intro/MainIntro';

const Home = () => {
  return (
    <div>
      <Hero />
      <MediaMention />
      <MainIntro />
    </div>
  )
}

export default Home