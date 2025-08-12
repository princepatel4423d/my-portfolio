import React, { useState, useEffect} from "react";
import { Hash, Wrench } from "@phosphor-icons/react"; // Phosphor icons
import { assets } from "@/assets/assets"; // adjust path if needed

const GitHubDiscord = () => {

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
    <>
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

        {/* Bottom Box: Under Construction */}
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
              <Wrench size={24} weight="fill" /> Under Construction
            </p>
          </div>
        </div>
      </div>

      {/* Right Box - 20% */}
      <div className="flex w-[20%] h-auto items-center justify-center rounded-lg p-2 relative border overflow-hidden">
        <div className="-rotate-12 text-center">
          <p className="text-xl font-semibold">discord</p>
          <p className="text-xs">(@princep4423d)</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Actively engaging in developer communities on Discord.
          </p>
        </div>
      </div>
    </>
  );
};

export default GitHubDiscord;