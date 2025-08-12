import React from "react";
import {
  LinkedinLogo,
  TwitterLogo,
  Code,
  RedditLogo,
  GithubLogo,
} from "@phosphor-icons/react";
import { assets } from "@/assets/assets"; // adjust path if needed

const SocialMedia = () => {
  return (
    <>
      {/* Left: 4 small boxes */}
      <div className="grid grid-cols-2 gap-3 w-full md:w-[40%]">
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/princepatel4423d"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0077B5] text-white p-2 rounded-lg shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500"
        >
          <LinkedinLogo size={20} weight="bold" />
          <span className="text-sm font-semibold">LinkedIn</span>
          <span className="text-xs">Connect professionally</span>
        </a>

        {/* Twitter */}
        <a
          href="https://x.com/princep4423d"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-2 rounded-lg shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500"
        >
          <TwitterLogo size={20} weight="bold" />
          <span className="text-sm font-semibold">Twitter</span>
          <span className="text-xs">Follow updates</span>
        </a>

        {/* CodePen */}
        <a
          href="https://codepen.io/princepatel4423d"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-2 rounded-lg shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500"
        >
          <Code size={20} weight="bold" />
          <span className="text-sm font-semibold">CodePen</span>
          <span className="text-xs">Live code snippets</span>
        </a>

        {/* Reddit */}
        <a
          href="https://www.reddit.com/user/princep4423d"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FF4500] text-white p-2 rounded-lg shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500"
        >
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
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <GithubLogo size={24} weight="bold" />
            <span className="text-base font-semibold">GitHub</span>
          </div>
          <p className="text-sm text-neutral-300">
            Explore open-source projects and contributions.
          </p>
          <p className="text-xs text-neutral-400">@princepatel4423d</p>
        </div>
      </a>
    </>
  );
};

export default SocialMedia;