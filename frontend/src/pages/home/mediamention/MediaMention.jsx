import React from 'react'
import LatestBlog from './_components/LatestBlog'
import LocationMusic from './_components/LocationMusic'
import HobbySkills from './_components/HobbySkills'
import AchievementsTools from './_components/AchievementsTools'
import GitHubDiscord from './_components/GitHubDiscord'
import SocialMedia from './_components/SocialMedia'

const MediaMention = () => {
  return (
    <section className="w-full py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="grid gap-3">
          <LatestBlog />
          {/* Location and Music */}
          <div className="flex gap-3 h-auto">
            <LocationMusic />
          </div>
          {/* Hobby and skills */}
          <div className="flex gap-3 h-auto">
            <HobbySkills />
          </div>
        </div>

        {/* Right Column */}
        <div className="grid gap-3">
          {/* Achievements and Tools */}
          <div className="flex gap-3 h-auto">
            <AchievementsTools />
          </div>
          {/* Github, Under Construction and Discord */}
          <div className="flex gap-3 h-auto">
            <GitHubDiscord />
          </div>
          {/* Social Media Links */}
          <div className="flex flex-col md:flex-row gap-3">
            <SocialMedia />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaMention