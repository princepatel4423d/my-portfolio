import React from 'react'
import Intro from './_components/Intro'
import Services from './_components/Services'
import StatGrid from './_components/StatGrid'
import Knowledge from './_components/Knowledge'
import Experience from './_components/Experience'
import Academic from './_components/Academic'
import SocialLinks from './_components/SocialLinks'

const About = () => {
  return (
    <div>
      <Intro />
      <StatGrid />
      <Services />
      <Knowledge />
      <Experience />
      <Academic />
      <SocialLinks />
    </div>
  )
}

export default About