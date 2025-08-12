import React from "react";
import { Link } from "react-router-dom";
import { Hand } from "@phosphor-icons/react";
import { SkillIcons } from "@/assets/Skills";

const Profile = ({ latestPost }) => {
  return (
    <div className="space-y-5">
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
        I'm always learning. Here you can find the projects I'm working on and details about my journey and skills.
      </p>

      <p className="text-lg">
        See more <Link to="/about" className="underline">about me</Link> or check out <Link to="/projects" className="underline">my projects</Link> ;)
      </p>

      <p className="text-lg">
        You might enjoy reading my{" "}
        <Link to="/blog" className="underline">blog posts</Link>
        {" "}or my{" "}
        {latestPost ? (
          <Link to={`/blog/post/${latestPost.slug}`} className="underline ml-1">
            "latest post"
          </Link>
        ) : (
          <span className="ml-1 italic text-gray-500">"latest post"</span>
        )}{" "}
        notes!
      </p>

      <p className="text-lg">
        I hope I can help you. I'd love to hear your ideas and contribute whenever possible.
      </p>
    </div>
  );
};

export default Profile;