import React, { useEffect, useState } from "react";
import Profile from "./_components/Profile";
import ProfileCard from "./_components/ProfileCard";

const MainIntro = () => {
  const username = "princepatel4423d";
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
        console.error("Failed to fetch GitHub repos:", error);
      }
    };

    const fetchLatestPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/blog/latest`);
        const data = await res.json();
        setLatestPost(data);
      } catch (err) {
        console.error("Failed to fetch latest blog post:", err);
      }
    };

    fetchTotals();
    fetchLatestPost();
  }, []);

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_23rem] py-16">
      <Profile latestPost={latestPost} />
      <div className="md:sticky md:top-24">
        <ProfileCard username={username} totals={totals} />
      </div>
    </div>
  );
};

export default MainIntro;