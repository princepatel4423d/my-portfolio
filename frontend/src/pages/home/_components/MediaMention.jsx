import React, { useEffect, useState, useContext } from 'react';
import {
  MusicNote,
  MapPin,
  Books,
  FileJs,
  Trophy,
  PencilRuler,
  Hash,
  Wrench,
  LinkedinLogo,
  TwitterLogo,
  RedditLogo,
  GithubLogo,
  Code,
} from '@phosphor-icons/react';
import { SkillIcons } from '@/assets/Skills';
import { AppContext } from '@/context/AppContext';
import { formatDate } from '@/utils/formatDate';
import { assets } from '@/assets/assets';

const MediaMention = () => {

  const { backendUrl } = useContext(AppContext);

  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      setLoadingPost(true);
      setErrorPost(null);
      try {
        const res = await fetch(`${backendUrl}/api/blog/latest`);
        if (!res.ok) throw new Error(`Failed to fetch latest blog post: ${res.statusText}`);
        const data = await res.json();
        setLatestPost(data);
      } catch (err) {
        setErrorPost(err.message || 'Failed to load latest blog post');
      } finally {
        setLoadingPost(false);
      }
    };

    fetchLatestPost();
  }, [backendUrl]);


  // Github Stats
  const username = 'princepatel4423d'
  const [stats, setStats] = useState({ stars: 0, followers: 0, repos: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const repos = await reposRes.json();
      const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

      setStats({ stars, followers: userData.followers, repos: repos.length });
    };

    fetchStats();
  }, [username]);

  return (
    <section className="w-full py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="grid gap-3">

          {/* Latest Blog Post */}
          <div
            className="p-2 border rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-start hover:scale-95 transition duration-500 cursor-pointer"
            onClick={() => {
              if (latestPost?.slug) window.location.href = `/blog/post/${latestPost.slug}`;
            }}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' && latestPost?.slug) window.location.href = `/blog/post/${latestPost.slug}`;
            }}
          >
            {/* Image */}
            <div className="w-full sm:w-1/2 flex-shrink-0">
              {loadingPost ? (
                <div className="w-full h-40 rounded-lg bg-gray-200 animate-pulse" />
              ) : errorPost ? (
                <div className="text-red-600 dark:text-red-400 p-2">{errorPost}</div>
              ) : (
                <img
                  src={
                    latestPost?.image
                      ? (latestPost.image.startsWith('http') || latestPost.image.startsWith('https')
                        ? latestPost.image
                        : `${backendUrl}/${latestPost.image.replace(/^\/+/, '')}`)
                      : 'https://img.freepik.com/free-photo/online-blog_53876_123696.jpg'
                  }
                  alt={latestPost?.title || 'Latest Blog Thumbnail'}
                  className="w-full h-40 sm:h-full max-h-40 sm:max-h-48 rounded-lg object-cover"
                  loading="lazy"
                />
              )}
            </div>

            {/* Text */}
            <div className="w-full sm:w-1/2 flex flex-col justify-between">
              {loadingPost ? (
                <>
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
                </>
              ) : errorPost ? null : (
                <>
                  <h3 className="text-base font-semibold line-clamp-2">{latestPost.title}</h3>
                  <p className="text-sm mt-1 line-clamp-2">{latestPost.description}</p>
                  <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mt-3">
                    <span>{formatDate(latestPost.date)}</span>
                    <span>{latestPost.readTime} min read</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Location and Music */}
          <div className="flex gap-3">
            {/* Location Box */}
            <div className="p-2 border rounded-lg shadow-sm basis-1/2 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin size={20} /> Location
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Idar, Gujarat</p>
              <div className="w-full rounded-md overflow-hidden">
                <iframe
                  title="Idar, Gujarat Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29195.84150472591!2d72.98727036398597!3d23.837076631095044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395da3f1254ee4cf%3A0x1bf54521f9c2e2b6!2sIdar%2C%20Gujarat%20383430!5e0!3m2!1sen!2sin!4v1753419261661!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0 w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Music Box */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://last.fm/user/princep4423d"
              className="relative p-2 rounded-lg shadow-sm basis-1/2 overflow-hidden border hover:scale-95 transition duration-500"
            >
              {/* Content Row: Text left, Image right */}
              <div className="flex items-start justify-between relative z-10">
                {/* Left Text Section */}
                <div className="flex flex-col space-y-1 max-w-1/2">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <MusicNote size={20} /> Alone
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Top listened track this month</p>
                </div>

                {/* Right Image */}
                <img
                  src={assets.songImage}
                  alt="Album Art"
                  className="w-1/2 h-1/2 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Full-width Description */}
              <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 z-10 relative">
                "This track captures the feeling of being completely immersed in your own world — when the noise fades, and the music speaks directly to your soul."
              </p>
            </a>
          </div>

          {/* Hobby and skills */}
          <div className="flex h-36 gap-3">
            {/* Hobby Box with Vertical Text and Image */}
            <div className="border rounded-lg shadow-sm w-[30%] overflow-hidden flex">
              {/* Rotated Text on Left */}
              <div className="flex items-center justify-center w-10">
                <span className="text-xs font-medium transform -rotate-90 whitespace-nowrap">
                  <Books size={14} className="inline-block" /> I love reading books
                </span>
              </div>

              {/* Image on Right */}
              <div className="flex-1">
                <img
                  src={assets.bookImage}
                  alt="books"
                  className="w-full h-full object-cover rounded-r-lg"
                />
              </div>
            </div>

            {/* Skills Marquee Box (70%) */}
            <div className="p-2 border rounded-lg shadow-sm w-[70%] space-y-3">
              <div className="flex items-center gap-2 text-base font-medium">
                <PencilRuler size={14} /> Skills
              </div>

              {/* First Row - Left to Right */}
              <div className="relative overflow-hidden w-full h-8">
                <div className="absolute animate-marquee-left flex gap-4 items-center">
                  {[...Object.entries(SkillIcons), ...Object.entries(SkillIcons)].map(([name, icon], i) => (
                    <img
                      key={`ltr-${name}-${i}`}
                      src={icon}
                      alt={name}
                      title={name}
                      className="h-6 w-auto"
                    />
                  ))}
                </div>
              </div>

              {/* Second Row - Right to Left */}
              <div className="relative overflow-hidden w-full h-8">
                <div className="absolute animate-marquee-right flex gap-4 items-center">
                  {[...Object.entries(SkillIcons), ...Object.entries(SkillIcons)].map(([name, icon], i) => (
                    <img
                      key={`rtl-${name}-${i}`}
                      src={icon}
                      alt={name}
                      title={name}
                      className="h-6 w-auto"
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column */}
        <div className="grid gap-3">

          <div className="flex gap-3 h-auto">
            {/* Achievements */}
            <div className="flex-1 p-2 border rounded-lg shadow-sm space-y-2">
              <h3 className="flex items-center text-base font-medium gap-2"><Trophy size={18} /> Achievements</h3>
              <ul className="text-sm text-neutral-600 dark:text-neutral-400 list-disc pl-4 space-y-1">
                <li>Completed 100+ freelance tasks</li>
                <li>Built a MERN blog app</li>
                <li>Top 5% on HackerRank</li>
              </ul>
            </div>

            {/* Tools */}
            <div className="flex-1 p-2 border rounded-lg shadow-sm space-y-2">
              <h3 className="flex items-center text-base font-medium gap-2"><FileJs size={18} />Tools</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                React, Node.js, MongoDB, Tailwind CSS, Git, VS Code
              </p>
            </div>
          </div>

          {/* Reading */}
          <div className="flex gap-3">
            {/* Left Box - 80% */}
            <div className="w-[80%] space-y-3">
              {/* Top Box: GitHub Contributions */}
              <div className="w-full border rounded-lg shadow-sm p-2 space-y-3">
                {/* Title */}
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Hash size={18} /> GitHub Contributions
                </div>

                {/* Contributions Chart */}
                <img
                  src="https://ghchart.rshah.org/princepatel4423d"
                  alt="GitHub contributions"
                  className="w-full h-auto object-cover"
                />

                {/* Stats Row */}
                <div className="flex justify-between text-sm font-normal">
                  <span>Stars: {stats.stars}</span>
                  <span>Followers: {stats.followers}</span>
                  <span>Repos: {stats.repos}</span>
                </div>
              </div>

              {/* Bottom Box: Under Construction with Transparent Overlay */}
              <div className="w-full h-20 relative border rounded-lg shadow-sm overflow-hidden">
                {/* Background Image */}
                <img
                  src={assets.underConstructionImage}
                  alt="Under Construction"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

                {/* Overlay Text */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <p className="flex items-center gap-2 text-xl text-white font-medium">
                    <Wrench size={24} /> Under Construction
                  </p>
                </div>
              </div>

            </div>

            {/* Right Box - 30% */}
            <div className="flex w-[20%] h-auto items-center justify-center rounded-lg p-2 relative border overflow-hidden">
              <div className="-rotate-12 text-center">
                <p className="text-xl font-semibold">discord</p>
                <p className="text-xs">(@princep4423d)</p>
                <p className='text-xs text-neutral-600 dark:text-neutral-400'>Actively engaging in developer communities on Discord.</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Left: 4 small boxes */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-[40%]">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/princepatel4423d"
                target="_blank" className="bg-[#0077B5] text-white p-2 rounded-lg shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500">
                <LinkedinLogo size={20} weight="bold" />
                <span className="text-sm font-semibold">LinkedIn</span>
                <span className="text-xs">Connect professionally</span>
              </a>

              {/* Twitter */}
              <a
                href="https://x.com/princep4423d"
                target="_blank" className="bg-black text-white p-2 rounded-lg shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500">
                <TwitterLogo size={20} weight="bold" />
                <span className="text-sm font-semibold">Twitter</span>
                <span className="text-xs">Follow updates</span>
              </a>

              {/* CodePen */}
              <a
                href="https://codepen.io/princepatel4423d"
                target="_blank" className="bg-black text-white p-2 rounded-lg shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500">
                <Code size={20} weight="bold" />
                <span className="text-sm font-semibold">CodePen</span>
                <span className="text-xs">Live code snippets</span>
              </a>

              {/* Reddit */}
              <a
                href="https://www.reddit.com/user/princep4423d"
                target="_blank" className="bg-[#FF4500] text-white p-2 rounded-lg shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500">
                <RedditLogo size={20} weight="bold" />
                <span className="text-sm font-semibold">Reddit</span>
                <span className="text-xs">Read Comments</span>
              </a>
            </div>

            {/* Right: Large GitHub box */}
            <a
              href="https://github.com/princepatel4423d"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-white w-full md:w-[60%] p-4 rounded-lg shadow flex flex-col justify-end space-y-2 bg-cover bg-center hover:scale-95 transition duration-500"
              style={{
                backgroundImage: `url(${assets.octocatGithub})`,
              }}
            >
              {/* Optional dark overlay */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <GithubLogo size={24} weight="bold" />
                  <span className="text-base font-semibold">GitHub</span>
                </div>
                <p className="text-sm text-neutral-300">Explore open-source projects and contributions.</p>
                <p className="text-xs text-neutral-400">@princepatel4423d</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaMention;