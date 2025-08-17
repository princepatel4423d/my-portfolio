import React from "react";
import { Link } from "react-router-dom";
import {
  Coffee,
  Star,
  GitFork,
  DownloadSimple,
  ArrowUpRight,
  GithubLogo,
  HouseLine
} from "@phosphor-icons/react";
import { assets } from "@/assets/assets";
import { GrayButton } from "@/components/ui/Button";

const ProfileCard = ({ username, totals }) => {
  return (
    <div className="w-full space-y-4 rounded-xl border p-5 shadow-md text-lg">
      <header className="flex justify-between gap-3 text-lg font-medium">
        <div className="flex items-center gap-1">
          <Coffee size={20} />
          <span>Currently making...</span>
        </div>
        <Link to="/projects" className="underline opacity-80 hover:opacity-100 text-sm">
          see projects
        </Link>
      </header>

      <div className="space-y-3 rounded-xl border p-3 text-base">
        <div className="flex items-start justify-between gap-1">
          <div>
            <div className="font-semibold">{username}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Today is:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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

        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <HouseLine size={20} /> My corner of internet, a.k.a Personal Homepage & Portfolio.
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
        <GrayButton
          as="a"
          target="_blank"
          href={assets.resume}
        >
          Download CV <DownloadSimple size={18} />
        </GrayButton>
        <Link
          className="flex leading-none underline opacity-70 hover:opacity-100 text-sm"
          to="/cv"
        >
          <span>read.cv</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;