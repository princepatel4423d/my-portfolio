import React from 'react'
import Hero from './hero/Hero'
import MediaMention from './mediamention/MediaMention'
import HomeIntro from './info/MainIntro'

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