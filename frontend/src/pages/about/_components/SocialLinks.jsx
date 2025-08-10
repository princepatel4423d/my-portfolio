import React from 'react';
import {
    SmileyXEyes,
    GithubLogo,
    LinkedinLogo,
    StackOverflowLogo,
    Code,
    RedditLogo,
    TwitterLogo,
    InstagramLogo,
} from "@phosphor-icons/react";

const SocialLinks = () => {
    return (
        <section className="py-14">
            <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-2xl md:text-3xl font-medium mb-12">
                <SmileyXEyes size={32} />Connect with me..
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">

                {/* Email */}
                <a
                    href="mailto:princep4423d@gmail.com"
                    className="bg-gradient-to-tr from-pink-400 to-red-500 backdrop-blur-md text-white p-3 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold">Email</h3>
                            <p className="text-xs sm:text-sm md:text-base">princep4423d@gmail.com</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">Send e-mail →</p>
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com/princepatel4423d"
                    className="bg-gradient-to-tr from-gray-800 to-black backdrop-blur-md text-white p-3 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <GithubLogo size={28} weight="bold" />
                        <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold">GitHub</h3>
                            <p className="text-xs sm:text-sm md:text-base">princepatel4423d</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">Open profile →</p>
                </a>

                {/* LinkedIn */}
                <a
                    href="https://linkedin.com/in/princepatel4423d"
                    className="bg-gradient-to-tr from-sky-400 to-blue-600 backdrop-blur-md text-white p-3 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <LinkedinLogo size={28} weight="bold" />
                        <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold">LinkedIn</h3>
                            <p className="text-xs sm:text-sm md:text-base">mateusfg</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">Open profile →</p>
                </a>

                {/* Stack Overflow */}
                <a
                    href="https://stackoverflow.com/users/princepatel4423d"
                    className="bg-gradient-to-tr from-orange-400 to-yellow-500 backdrop-blur-md text-white p-3 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <StackOverflowLogo size={28} weight="bold" />
                        <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold">Stack Overflow</h3>
                            <p className="text-xs sm:text-sm md:text-base">mateusfg7</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">Open summary →</p>
                </a>

                {/* Codepen */}
                <a
                    href="https://codepen.io/princepatel4423d"
                    className="bg-gradient-to-tr from-neutral-700 to-neutral-900 backdrop-blur-md text-white p-3 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <Code size={28} weight="bold" />
                        <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold">Codepen</h3>
                            <p className="text-xs sm:text-sm md:text-base">mateusfg7</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">View pens →</p>
                </a>

                {/* Reddit */}
                <a
                    href="https://reddit.com/u/princep4423d"
                    className="bg-gradient-to-tr from-orange-500 to-red-400 backdrop-blur-md text-white p-3 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <RedditLogo size={28} weight="bold" />
                        <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold">Reddit</h3>
                            <p className="text-xs sm:text-sm md:text-base">u/mateusfg7</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">See comments →</p>
                </a>

                {/* Twitter */}
                <a
                    href="https://twitter.com/princep4423d"
                    className="bg-gradient-to-tr from-cyan-400 to-blue-500 backdrop-blur-md text-white p-3 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <TwitterLogo size={28} weight="bold" />
                        <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold">Twitter</h3>
                            <p className="text-xs sm:text-sm md:text-base">@mateusfg77</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">See tweets →</p>
                </a>

                {/* Instagram */}
                <a
                    href="https://instagram.com/whoprixce4423"
                    className="bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 backdrop-blur-md text-white p-3 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <InstagramLogo size={28} weight="bold" />
                        <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold">Instagram</h3>
                            <p className="text-xs sm:text-sm md:text-base">@mateusfg7</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">Open profile →</p>
                </a>
            </div>
        </section>
    );
};

export default SocialLinks;
