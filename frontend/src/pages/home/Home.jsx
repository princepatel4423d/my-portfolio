import React from 'react';
import Hero from './hero/Hero';
import MediaMention from './mediamention/MediaMention';
import MainIntro from './intro/MainIntro';
import Banner from '@/components/common/Banner';

const Home = () => {
  return (
    <div>
      <Hero />
      <MediaMention />
      <MainIntro />
      <Banner />
    </div>
  )
}

export default Home