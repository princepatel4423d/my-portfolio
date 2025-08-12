import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Hand,
  Coffee,
  Star,
  GitFork,
  DownloadSimple,
  ArrowUpRight,
  GithubLogo,
} from '@phosphor-icons/react';

import { SkillIcons } from '@/assets/Skills';
import { assets } from '@/assets/assets';

const HomeIntro = () => {
  const username = 'princepatel4423d';
  const [totals, setTotals] = useState({ stars: 0, forks: 0 });
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await res.json();

        const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const forks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

        setTotals({ stars, forks });
      } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
      }
    };

    const fetchLatestPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/blog/latest`);
        const data = await res.json();
        setLatestPost(data);
      } catch (err) {
        console.error('Failed to fetch latest blog post:', err);
      }
    };

    fetchTotals();
    fetchLatestPost();
  }, []);

  return (
    <div className="flex flex-col py-16 gap-10 md:flex-row md:gap-8">
      {/* Left Section */}
      <div className="flex-1 space-y-5">
        <h2 className="text-sm text-neutral-500">Full-Stack Developer</h2>

        <p className="flex items-center gap-2 text-xl">
          <Hand size={20} />
          <span>Hello, welcome to my little corner on the web!</span>
        </p>

        <p className="text-lg leading-relaxed">
          I'm a self-taught code solutions programmer. I love programming and I try to use{" "}
          <strong>software architecture</strong>, <strong>clean</strong>, and <strong>maintainable code</strong>. I like to work with technologies from the
          <img src={SkillIcons.JavaScript} className="inline h-5 mx-1" alt="JavaScript" title="JavaScript" />,
          <img src={SkillIcons.React} className="inline h-5 mx-1" alt="React" title="React" />,
          <img src={SkillIcons.Python} className="inline h-5 mx-1" alt="Python" title="Python" /> and
          <img src={SkillIcons.Rust} className="inline h-5 mx-1" alt="Rust" title="Rust" /> ecosystem.
        </p>

        <p className="text-lg leading-relaxed">
          I'm always learning. Here you can find the projects I'm working on and details about my journey and skills. I’m always looking to improve, and you can follow my progress and studies.
        </p>

        <p className="text-lg">
          See more <a href="/about" className="underline">about me</a> or check out <a href="/projects" className="underline">my projects</a> ;)
        </p>

        <p className="text-lg">
          You might enjoy reading my{" "}
          <a href="/blog" className="underline">blog posts</a>
          {" "}or my{" "}
          {latestPost ? (
            <a href={`/blog/post/${latestPost.slug}`} className="underline ml-1">
              "Latest Post"
            </a>
          ) : (
            <span className="ml-1 italic text-gray-500">"Latest Post"</span>
          )}{" "}
          notes!
        </p>

        <p className="text-lg">
          I hope I can help you. I'd love to hear your ideas and contribute whenever possible.
        </p>
      </div>

      {/* Right Section */}
      <div className="relative">
        <div className="h-fit md:sticky md:top-24 md:w-[23rem]">
          <div className="w-full space-y-4 rounded-xl border p-5 shadow-md text-lg">
            <header className="flex justify-between gap-3 text-lg font-medium">
              <div className="flex items-center gap-1">
                <Coffee size={20} />
                <span>Currently making...</span>
              </div>
              <a href="/projects" className="underline opacity-80 hover:opacity-100 text-sm">see projects</a>
            </header>

            <div className="space-y-3 rounded-xl border p-3 text-base">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <div className="font-semibold">princep4423d</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Today is: <span>
                        {new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <GithubLogo size={20} />
                  </a>
                </div>
              </div>

              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                🏡 My corner of internet, a.k.a Personal Homepage & Portfolio.
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star size={18} />
                  <span>{totals.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={18} />
                  <span>{totals.forks}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <a
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-700/10 px-4 py-2 transition hover:bg-neutral-700 hover:text-white dark:bg-neutral-400/10 dark:hover:bg-neutral-400 dark:hover:text-black"
                target="_blank"
                href={assets.resume}
              >
                Download CV <DownloadSimple size={18} />
              </a>
              <Link
                className="flex leading-none underline opacity-70 hover:opacity-100 text-sm"
                to="/cv"
              >
                <span>read.cv</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeIntro;