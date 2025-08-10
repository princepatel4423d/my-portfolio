import React from "react";
import { Briefcase, FileText } from "@phosphor-icons/react";
import { Typewriter } from "./TypeWriter";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";

const Hero = () => {
    return (
        <section className="py-20 flex items-center justify-center text-center">
            <div>
                {/* Heading */}
                <h1 className="font-playfair leading-normal text-4xl sm:text-6xl md:text-7xl font-light text-neutral-900 dark:text-white">
                    I&apos;m <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text italic font-normal font-playfair">Prince</span>
                    <span className="inline-block align-middle mx-2">
                        <img
                            src={assets.heroImage}
                            alt="Prince"
                            className="sm:w-28 sm:h-14 w-20 h-12 rounded-full shadow-md object-cover"
                        />
                    </span>
                    ,<br />
                    a passionate
                    <span className="inline-block align-middle mx-2">
                        <img
                            src={assets.developmentImage}
                            alt="developer"
                            className="sm:w-28 sm:h-14 w-20 h-12 rounded-full shadow-md object-cover"
                        />
                    </span>
                    <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text italic font-normal font-playfair">Web Developer</span><br />
                    based in India
                    <span className="inline-block align-middle mx-2">
                        <img
                            src={assets.indiaImage}
                            alt="india"
                            className="sm:w-28 sm:h-14 w-20 h-12 rounded-full shadow-md object-cover"
                        />
                    </span>
                </h1>

                <div className="mt-4">
                    <Typewriter
                        words={['Full Stack Developer', 'Open Source Enthusiast', 'MERN Stack Lover', 'JavaScript Aficionado']}
                        loop={true}
                        cursor={true}
                        speed={70}
                        delay={1500}
                    />
                </div>

                {/* Subtext */}
                <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-6 max-w-xl mx-auto">
                    A frontend developer passionate about creating accessible, high-performance websites for modern brands and startups.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/cv"
                        className="inline-flex items-center gap-2 bg-black text-white dark:bg-neutral-200 dark:text-black text-sm px-6 py-2.5 rounded-full shadow-md hover:bg-neutral-800 transition"
                    >
                        <FileText size={18} weight="duotone" /> Read CV
                    </Link>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 border border-black dark:border-white text-black dark:text-white text-sm px-6 py-2.5 rounded-full shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                    >
                        <Briefcase size={18} weight="duotone" /> Projects
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;