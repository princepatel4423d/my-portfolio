import React from "react";
import { LinkedinLogo, GithubLogo, TwitterLogo } from "@phosphor-icons/react";

const FooterSocial = () => (
  <>
    <a
      href="https://linkedin.com/in/princepatel4423d"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="relative group"
    >
      <LinkedinLogo size={24} className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none
        opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all
        bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black text-sm px-3 py-2 rounded-xl shadow z-10 whitespace-nowrap">
        LinkedIn
      </span>
    </a>
    <a
      href="https://github.com/princepatel4423d"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className="relative group"
    >
      <GithubLogo size={24} className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none
        opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all
        bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black text-sm px-3 py-2 rounded-xl shadow z-10 whitespace-nowrap">
        GitHub
      </span>
    </a>
    <a
      href="https://x.com/princep4423d"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="relative group"
    >
      <TwitterLogo size={24} className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none
        opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all
        bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black text-sm px-3 py-2 rounded-xl shadow z-10 whitespace-nowrap">
        Twitter
      </span>
    </a>
  </>
);

export default FooterSocial;
