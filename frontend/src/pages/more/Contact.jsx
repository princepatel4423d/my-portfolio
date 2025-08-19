import React from "react";
import { Envelope, Phone, MapPin, LinkedinLogo, GithubLogo } from "@phosphor-icons/react";
import { BlueButton } from "@/components/ui/Button";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "ef6b194e-2e0c-4cd5-a019-a9933cb80142");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.error("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      <section className="max-w-4xl mx-auto text-center py-12">
        {/* Subheading */}
        <p className="uppercase text-sm tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">
          Get in Touch
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-2">
          Let’s create something <br />
          <span className="font-playfair bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 text-transparent bg-clip-text italic">
            amazing together
          </span>
        </h1>

        {/* Optional Description */}
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Have an idea, project, or just want to say hello? Fill out the form below,
          and I’ll get back to you as soon as possible.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 py-12">
        {/* QUICK CONTACT */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Quick Contact</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            I’d love to hear from you! Whether you have a question or just want to say hello, feel free to reach out.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Envelope size={28} className="text-blue-500" />
              <span>princep4423d@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={28} className="text-green-500" />
              <span>+91 99984 01922</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin size={28} className="text-red-500" />
              <span>Himatnagar, India</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-full hover:scale-110 transition">
              <LinkedinLogo size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-full hover:scale-110 transition">
              <GithubLogo size={24} />
            </a>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
          <form onSubmit={onSubmit} className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg 
                           focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500
                           focus:ring-1 focus:ring-blue-700 dark:bg-neutral-800 transition"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg 
                           focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500
                           focus:ring-1 focus:ring-blue-700 dark:bg-neutral-800 transition"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg 
                           focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500
                           focus:ring-1 focus:ring-blue-700 dark:bg-neutral-800 transition"
                required
              ></textarea>
            </div>
            <BlueButton
              type="submit"
            >
              Send Message
            </BlueButton>
            {result && <p className="text-sm text-gray-500 dark:text-gray-400">{result}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;