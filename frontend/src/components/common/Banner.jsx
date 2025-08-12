import React from "react";

const Banner = () => {
    return (
        <section className="relative py-16 flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">
            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl font-light text-center mb-6 leading-tight">
                FROM CONCEPT TO <span className="font-bold">CREATION</span><br />
                LET&apos;S MAKE IT <span className="font-bold">HAPPEN!</span>
            </h1>

            {/* Rotating "OPEN TO WORK" Circle */}
            <div className="absolute right-6 md:right-20 top-8 hidden md:block">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* SVG for ring and circular text */}
                    <svg
                        className="absolute inset-0 w-full h-full rotate-circle"
                        viewBox="0 0 96 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Thick blue ring */}
                        <circle cx="48" cy="48" r="44" stroke="#2563eb" strokeWidth="8" fill="none" />
                        {/* Define circular path for text */}
                        <defs>
                            <path
                                id="circlePath"
                                d="M48,8 a40,40 0 1,1 0,80 a40,40 0 1,1 0,-80"
                            />
                        </defs>
                        {/* Circular text */}
                        <text fill="#fff" fontSize="12" fontWeight="bold" letterSpacing="3">
                            <textPath
                                xlinkHref="#circlePath"
                                startOffset="0%"
                                textLength="255"
                                lengthAdjust="spacingAndGlyphs"
                            >
                                OPEN TO WORK · OPEN TO WORK ·
                            </textPath>
                        </text>
                    </svg>
                    {/* Center star, always upright */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white">
                            <path
                                d="M16 4 L18.5 14 H29 L20 18.5 L22.5 28 L16 22 L9.5 28 L12 18.5 L3 14 H13.5 Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Button */}
            <a
                href="#contact"
                className="mt-6 mb-6 px-7 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center gap-3 text-base font-semibold shadow-lg transition focus:outline-none"
            >
                Get In Touch
                <span className="w-7 h-7 flex items-center justify-center bg-black rounded-full">
                    <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </span>
            </a>

            {/* Availability and About */}
            <div className="max-w-xl mx-auto text-center">
                <p className="text-lg font-bold mb-2">
                    I&apos;m available for full-time roles &amp; freelance projects.
                </p>
                <p className="text-base text-neutral-300">
                    I thrive on crafting dynamic web applications,<br />
                    and delivering seamless user experiences.
                </p>
            </div>
        </section>
    );
};

export default Banner;