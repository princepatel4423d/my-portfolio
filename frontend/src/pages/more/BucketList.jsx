import React from "react";
import { MapPin, Star, CheckCircle, Heart, Camera, MusicNote, BookOpen, Trophy, Globe, Microphone, Rocket, FilmSlate, Palette } from "@phosphor-icons/react";
import Banner from "@/components/common/Banner";

const bucketItems = [
  {
    title: "Visit Japan during Cherry Blossom season",
    icon: <MapPin size={28} className="text-pink-500" />,
    completed: false,
  },
  {
    title: "Publish my own tech book",
    icon: <Star size={28} className="text-yellow-500" />,
    completed: false,
  },
  {
    title: "Contribute to 100+ open-source projects",
    icon: <CheckCircle size={28} className="text-green-500" />,
    completed: true,
  },
  {
    title: "Scuba dive in the Great Barrier Reef",
    icon: <Heart size={28} className="text-red-500" />,
    completed: false,
  },
  {
    title: "Paraglide over the Saputara Mountains",
    icon: <CheckCircle size={28} className="text-green-500" />,
    completed: true,
  },
  {
    title: "Speak at an international tech conference",
    icon: <Microphone size={28} className="text-purple-500" />,
    completed: false,
  },
  {
    title: "Build and launch my own SaaS product",
    icon: <Rocket size={28} className="text-orange-500" />,
    completed: false,
  },
  {
    title: "Learn to play the piano",
    icon: <MusicNote size={28} className="text-indigo-500" />,
    completed: false,
  },
  {
    title: "Direct and edit a short film",
    icon: <FilmSlate size={28} className="text-teal-500" />,
    completed: false,
  },
  {
    title: "Photograph the Northern Lights",
    icon: <Camera size={28} className="text-pink-400" />,
    completed: false,
  },
  {
    title: "Write 500+ blog articles",
    icon: <BookOpen size={28} className="text-amber-500" />,
    completed: false,
  },
  {
    title: "Win a hackathon",
    icon: <Trophy size={28} className="text-green-400" />,
    completed: true,
  },
  {
    title: "Create a digital art collection",
    icon: <Palette size={28} className="text-fuchsia-500" />,
    completed: false,
  },
];

const BucketList = () => {
  return (
    <>
      <section className="text-center py-12">
        {/* Subheading */}
        <p className="uppercase text-sm tracking-widest text-neutral-600 dark:text-neutral-400 mb-3">
          My Bucket List
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-4">
          Exploring <br />
          <span className="font-playfair bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 text-transparent bg-clip-text italic">
            dreams & goals
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          A curated collection of experiences, adventures, and aspirations I aim
          to fulfill in my lifetime — each chosen with intent, excitement, and a
          deep sense of wonder.
        </p>
      </section>

      <div className="py-12 max-w-4xl mx-auto">
        {/* List */}
        <div className="grid gap-6 md:grid-cols-2">
          {bucketItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-5 rounded-2xl border transition hover:shadow-lg ${item.completed
                  ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-neutral-700"
                }`}
            >
              <div>{item.icon}</div>
              <div className="flex-1">
                <p
                  className={`text-lg ${item.completed
                      ? "line-through text-green-600 dark:text-green-400"
                      : "text-gray-800 dark:text-gray-200"
                    }`}
                >
                  {item.title}
                </p>
              </div>
              {item.completed && (
                <CheckCircle size={24} className="text-green-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      <Banner />
    </>
  );
};

export default BucketList;