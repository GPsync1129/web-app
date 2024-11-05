"use client";
import React, { useState, useEffect } from "react";
import Script from 'next/script';
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Confetti from "react-confetti";
import { Star } from "lucide-react";
import '../app/globals.css';
export default function Home() {
  const [selectedOS, setSelectedOS] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const testimonials = [
    { name: "John Doe", text: "This software is amazing!" },
    { name: "Jane Smith", text: "Incredibly easy to use." },
    { name: "Bob Johnson", text: "Game-changing for my workflow." },
    { name: "Johnson", text: "Game-changing for my workflow." },
    { name: "Bob Doe", text: "Game-changing for my workflow." },
  ];

  const creators = [
    {
      name: "Om Chaudhari",
      role: "ML Developer",
      image: "/om.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/om-chaudhari-38960721b/",
        github: "https://github.com/omchaudhari1107",
      },
    },
    {
      name: "Yash Chaudhari",
      role: "ML Developer",
      image: "/Yash.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/yash-chaudhari-254961242/",
        github: "https://github.com/Yashchaudhari29/",
      },
    },
    {
      name: "Shreekant Sureliya",
      role: "Developer@ONGC",
      image: "/shree.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/shreekant-sureliya-69aaa3125/",
        github: "https://gitlab.com/shreekant_sureliya",
      },
    },
  ];

  const handleDownload = (os) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    console.log(`Downloading for ${os}`);

    // Download logic based on OS
    let fileUrl;

    if (os === "windows") {
      fileUrl = "https://www.dropbox.com/scl/fi/jz7rrdzuaxjoejgpyz5ih/gpsync.exe?rlkey=f3dna7jn17z599hg8ndu22poz&st=8ucouqqp&dl=1";
    } else if (os === "linux-deb") {
      fileUrl = "https://www.dropbox.com/scl/fi/0qktmzv9ve9gb5lp4p50o/gpsync.deb?rlkey=daknm2may04v9f8fu9a9pobzl&st=utx30o5w&dl=1";
    } else {
      console.error("Unsupported OS selected.");
      return;
    }

    window.location.href = fileUrl;
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        } transition-colors duration-300`}
    >
      {/* <Script id="ad-script">
                {`
                  atOptions = {
                    'key' : '417e4497e5d272d2d768c4ae6aaa6f6d',
                    'format' : 'iframe',
                    'height' : 90,
                    'width' : 728,
                    'params' : {}
                  };
                `}
              </Script>

              <Script
                src="//www.topcpmcreativeformat.com/417e4497e5d272d2d768c4ae6aaa6f6d/invoke.js"
                strategy="lazyOnload" // or use 'afterInteractive' if you want it to load immediately after the page becomes interactive
              />
              <Script
                src='//pl24684711.cpmrevenuegate.com/eb/1c/73/eb1c733ca44c609854f1b897dcc29281.js'
              /> */}
      <Head>
        <meta
          name="description"
          content="Download google photos with metadata"
        />
        <meta name="google-adsense-account" content="ca-pub-9488068101453959" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {showConfetti && <Confetti />}

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMobile={isMobile}
      />

      <main className="mx-auto px-4 py-20">
        <div className="" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}>

          <motion.div
            className={`${isMobile ? "w-full" : "lg:w-2/3"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DownloadSection
              handleDownload={handleDownload}
              darkMode={darkMode}
              isMobile={isMobile}
            />

            <InstructionSection darkMode={darkMode} />

            <CreatorsSection
              creators={creators}
              darkMode={darkMode}
              isMobile={isMobile}
            />

            <TestimonialSection
              testimonials={testimonials}
              currentTestimonial={currentTestimonial}
              darkMode={darkMode}
            />

            <FeedbackForm darkMode={darkMode} />
          </motion.div>

        </div>
      </main>
    </div>
  );
}




//Navbar

function Navbar({ darkMode, setDarkMode, isMobile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    // Fetch the average rating when the component mounts
    async function fetchAverageRating() {
      try {
        const response = await fetch('/api/feedback'); // Replace with your actual endpoint
        if (response.ok) {
          const data = await response.json();
          setAverageRating(data.averageRating);
        } else {
          console.error("Failed to fetch average rating");
        }
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    }

    fetchAverageRating();
  }, []);
  return (
    <nav className={`fixed w-full top-0 z-50 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="https://www.gpsync.online/" className="font-bold text-xl">
          Google Photos Downloading
          ({averageRating !== null && (
            <span className="ml-2 flex items-center">
              {averageRating.toFixed(1)}
              <span className="ml-1">⭐</span>
            </span>
          )})
        </a>
        {isMobile ? (
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl focus:outline-none transform transition-transform duration-300"
              style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              ☰
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <a href="#" className="mx-3 hover:text-gray-500 focus:bg-transparent active:bg-transparent transition-colors ">
              Home
            </a>
            <a href="#guide" className="mx-3 hover:text-gray-500 focus:bg-transparent active:bg-transparent transition-colors ">
              Documentation
            </a>
            <a href="#ourcreator" className="mx-3 hover:text-gray-500 focus:bg-transparent active:bg-transparent transition-colors ">
              Creators
            </a>
            <a href="#testimonials" className="mx-3 hover:text-gray-500 focus:bg-transparent active:bg-transparent transition-colors ">
              Testimonials
            </a>
            <a href="#feedback" className="mx-3 hover:text-gray-500 focus:bg-transparent active:bg-transparent transition-colors ">
              Feedback
            </a>
            <a
              className="bmc-button inline-flex items-center px-3 py-2 border rounded text-white bg-[#FF813F] border-[#FF813F] hover:bg-[#ff9b66] hover:border-[#ff9b66] focus:bg-transparent active:bg-transparent transition-colors  ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.buymeacoffee.com/">
              <img
                src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
                alt="Buy me a coffee"
                className="w-6 h-6 mr-2"
              />
              <span className="font-['Cookie',_cursive] text-lg">Buy me a coffee</span>
            </a>
            <style jsx>{`
      @import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');
    `}</style>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full bg-opacity-20 backdrop-blur-md transform transition-transform duration-300"
              style={{ transform: darkMode ? "rotate(360deg)" : "rotate(0deg)" }}
            >
              <span style={{ fontSize: '1.5rem' }}>
                {darkMode ? "🌞" : "🌙"}
              </span>
            </button>

          </div>
        )}
      </div>
      {isMobile && (
        <div
          className={`${darkMode ? "bg-gray-800" : "bg-white"} transition-all duration-300 ${menuOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"} `}
        >
          <a href="#" className="block px-6 py-2 transition-colors ">
            Home
          </a>
          <a href="#guide" className="block px-6 py-2 transition-colors ">
            Documentation
          </a>
          <a href="#ourcreator" className="block px-6 py-2 transition-colors ">
            Creators
          </a>
          <a href="#testimonials" className="block px-6 py-2 transition-colors ">
            Testimonials
          </a>
          <a href="#feedback" className="block px-6 py-2 transition-colors ">
            Feedback
          </a>
          <a href="https://www.buymeacoffee.com/" className="block px-6 py-2 transition-colors ">
            <span style={{ color: '#B8860B' }}>Support</span>
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full bg-opacity-20 backdrop-blur-md transform transition-transform duration-300"
            style={{ transform: darkMode ? "rotate(360deg)" : "rotate(0deg)" }}
          >
            <span style={{ fontSize: '1.5rem' }}>
              {darkMode ? "🌞" : "🌙"}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}



// Download Section 


function DownloadSection({ handleDownload, darkMode, isMobile }) {
  return (
    <section className="md:h-[100vh]"
      style={{ height: '100vh' }}>
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-center font-sans bg-clip-text text-transparent bg-gradient-to-r"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >

        <div
          className={`md:mt-48 ${darkMode ? 'text-white' : 'text-black'} font-sans`}
          style={{
            background: 'linear-gradient(to right, #00a3ee, #e95420)', // Gradient from white to dark blue
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', // Make text color transparent
            // fontSize: '150%', // Adjust font size as necessary
            fontWeight: 'bolder', // Make it bold for better visibility
          }}
        >
          Capture Moments,<br />Secure Memories.
        </div>
      </motion.h1>
      <motion.h3
        className={`text-xxl md:text-xl lg:text-2xl text-center mt-4 mb-8 font-poppins ${darkMode ? 'text-gray-100' : 'text-gray-700'
          } text-justify`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
      >
        Why choose us? We extract images from Google Photos with all original metadata intact - location, timestamps, and settings-embedded within each image. Albums are automatically organized on your device, mirroring Google Photos, so you can easily enjoy, organize, and share your memories without separate metadata files. Make sure to mail on <pre style={{ display: 'inline' }}>
          <code
            onClick={() => copyToClipboard('gpsync.official@gmail.com')}
            className={`cursor-pointer ${darkMode ? "bg-yellow-700" : "bg-yellow-200"} rounded p-1 font-mono text-md`}
            style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', MsUserSelect: 'none' }}
          >
            gpsync.official@gmail.com
          </code>
        </pre> for Bug Report.
      </motion.h3>
      <div
        className={`flex ${isMobile ? "flex-col" : "flex-row"
          } justify-center items-center gap-16 md:gap-8 mt-16`}
      >
        {/* Windows Section */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={isMobile ? 90 : 120}
            height={isMobile ? 90 : 100}
            fill="#00A3EE"
            className="mb-4 md:mb-10"
            viewBox="0 0 16 16"
          >
            <path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z" />
          </svg>

          <motion.button
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg w-full md:w-64 ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold transition-all  transform hover:scale-105 hover:shadow-lg`}
            onClick={() => handleDownload("windows")}
          >
            <div className="flex items-center flex-wrap sm:flex-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>

              <span className="text-lg ml-3">for Windows-v1.0 (.exe)</span>
            </div>

            {/* <span className="text-xs md:text-sm">Windows 10, 11</span> */}
          </motion.button>
        </div>

        {/* Linux Section */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={isMobile ? 90 : 120}
            height={isMobile ? 90 : 100}
            fill="#E95420"
            className="mb-4 md:mb-10"
            viewBox="0 0 16 16"
          >
            <path d="M2.273 9.53a2.273 2.273 0 1 0 0-4.546 2.273 2.273 0 0 0 0 4.547Zm9.467-4.984a2.273 2.273 0 1 0 0-4.546 2.273 2.273 0 0 0 0 4.546M7.4 13.108a5.54 5.54 0 0 1-3.775-2.88 3.27 3.27 0 0 1-1.944.24 7.4 7.4 0 0 0 5.328 4.465c.53.113 1.072.169 1.614.166a3.25 3.25 0 0 1-.666-1.9 6 6 0 0 1-.557-.091m3.828 2.285a2.273 2.273 0 1 0 0-4.546 2.273 2.273 0 0 0 0 4.546m3.163-3.108a7.44 7.44 0 0 0 .373-8.726 3.3 3.3 0 0 1-1.278 1.498 5.57 5.57 0 0 1-.183 5.535 3.26 3.26 0 0 1 1.088 1.693M2.098 3.998a3.3 3.3 0 0 1 1.897.486 5.54 5.54 0 0 1 4.464-2.388c.037-.67.277-1.313.69-1.843a7.47 7.47 0 0 0-7.051 3.745" />
          </svg>

          <div
            className={`flex ${isMobile ? "flex-col" : "flex-row"
              } space-y-4 md:space-y-0 md:space-x-4`}
          >
            {/* Linux .deb Button */}
            <motion.button
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg w-full md:w-64 ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                } text-white font-semibold transition-all  transform hover:scale-105 hover:shadow-lg`}
              onClick={() => handleDownload("windows")}
            >
              <div className="flex items-center flex-wrap sm:flex-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>

                <span className="text-lg ml-3">for Ubuntu-v1.0 (.deb)</span>
              </div>
            </motion.button>

            {/* Linux .rpm Button */}
            {/* <motion.button
            className={`flex flex-col items-center justify-center p-4 rounded-lg w-full md:w-48 ${
              darkMode ? "bg-blue-600" : "bg-blue-500"
            } text-white font-semibold transition-colors duration-300`}
            onClick={() => handleDownload("linux-rpm")}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">⬇</span>
              <span className="text-xl">.rpm</span>
            </div>
            <span className="text-sm">Red Hat, Fedora, SUSE</span>
          </motion.button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

// Instructions Section

function InstructionSection({ darkMode }) {
  return (
    <section id="guide" className="md:h-[100vh] content-center">
      <section
        id="about"
        className={`my-20 p-8 md:mt-28 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
          } h-auto  overflow-auto`}
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-start font-playfair">
          Documentation
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Windows Installation</h3>
            <ol className="list-decimal space-y-3 text-sm md:text-base">
              <li>Ensure you are logged into both your Google account and Google Photos.</li>
              <li>Download and launch the GPsync application (.exe).</li>
              <li>Select the appropriate account tailored to your synchronization needs.</li>
              <li>Specify the appropriate directory for downloading photos, or use the default path.</li>
              <li>Initiate the process and let GPsync work its magic.</li>
              <li>For an in-depth visual guide, explore our comprehensive tutorial:
                <a href="https://www.youtube.com/watch?v=EXVVr2emHmo" target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-500 hover:text-blue-600 transition-colors">
                  🎥 Watch Windows Tutorial
                </a>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Ubuntu Installation</h3>
            <ol className="list-decimal space-y-3 text-sm md:text-base">
              <li>First of all, log into your Google account and Google Photos via Firefox.</li>
              <li>After acquiring the gpsync.deb file, execute this command to install gpsync to your machine:
                <pre className="mt-2">
                  <code style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', MsUserSelect: 'none' }} onClick={() => copyToClipboard('sudo dpkg -i gpsync.deb')} className={`cursor-pointer ${darkMode ? "bg-yellow-700" : "bg-yellow-200"} rounded p-1 font-mono text-sm inline-block`}>
                    sudo dpkg -i gpsync.deb
                  </code>
                </pre>
              </li>
              <li>Launch the application on terminal (ctrl+alt+t) with:
                <pre className="mt-2"><code style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', MsUserSelect: 'none' }} onClick={() => copyToClipboard('gpsync')} className={`cursor-pointer ${darkMode ? "bg-yellow-700" : "bg-yellow-200"} rounded p-1 font-mono text-sm inline-block`}>gpsync</code></pre>
              </li>
              <li>Allow GPsync to orchestrate your synchronization seamlessly.</li>
              <li>To uninstall the application, type the command:
                <pre className="mt-2"><code style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', MsUserSelect: 'none' }} onClick={() => copyToClipboard('gpsync-uninstall')} className={`cursor-pointer ${darkMode ? "bg-yellow-700" : "bg-yellow-200"} rounded p-1 font-mono text-sm inline-block`}>gpsync-uninstall</code></pre>
              </li>
              <li>For a detailed walkthrough, our video guide awaits:
                <a href="https://www.youtube.com/watch?v=qtLCkn4H7WY" target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-500 hover:text-blue-600 transition-colors">
                  🎥 Watch Ubuntu Tutorial
                </a>
              </li>
            </ol>

          </div>
        </div>
      </section>
    </section>
  );
}

{/* <h3 className="text-xl md:text-3xl font-semibold mb-8 text-center font-playfair">
         How the Software Works
       </h3>
       <video
         controls
         autoPlay
         muted
         className="w-full h-48 md:h-64 mt-4 rounded-lg border border-gray-700"
       >
         <source src="/instruction-video.mp4" type="video/mp4" />
         Your browser does not support the video tag.
       </video> */}



// creator card section 

function CreatorsSection({ creators, darkMode, isMobile }) {
  return (
    <section className="md:h-[100vh] content-center pt-20" id="ourcreator">
      <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center font-playfair content-end">
        Meet Our Creators
      </h3>
      <div className="flex flex-col items-center">
        <div
          className={`flex flex-col ${isMobile ? "" : "md:flex-row"} justify-center items-center gap-8 mb-8 w-full`}
        >
          {creators.map((creator, index) => (
            <CreatorCard key={index} creator={creator} darkMode={darkMode} />
          ))}
        </div>
      </div>

    </section>
  );
}


function CreatorCard({ creator, darkMode }) {
  return (
    <motion.div
      className={`w-full md:w-64 lg:w-72 xl:w-80 p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        src={creator.image}
        alt={creator.name}
        width={150}
        height={150}
        className="rounded-full mx-auto mb-4"
      />
      <h4 className="text-lg md:text-xl font-semibold mb-2 text-center">
        {creator.name}
      </h4>
      <p className="text-sm mb-4 text-center">{creator.role}</p>
      <div className="flex justify-center space-x-4">
        {Object.entries(creator.socials).map(
          ([platform, link]) =>
            link !== "#" && ( // Only render if the link is not a placeholder
              <motion.a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {platform === "linkedin" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0077B5"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                ) : platform === "github" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                ) : null}
              </motion.a>
            )
        )}
      </div>
    </motion.div>
  );
}


// STAR Animations

function AnimatedStar({ filled, onClick, onHover, onMouseLeave }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      className="cursor-pointer"
    >
      <Star
        className={`w-8 h-8 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
      />
    </div>
  );
}

function StarRating({ rating, setRating, isInteractive = true }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-2 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <AnimatedStar
          key={star}
          filled={star <= (isInteractive ? hover || rating : rating)}
          onClick={() => isInteractive && setRating(star)}
          onHover={() => isInteractive && setHover(star)}
          onMouseLeave={() => isInteractive && setHover(null)}
        />
      ))}
    </div>
  );
}

// Testimonial Section 

export function TestimonialSection({ darkMode }) {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch random testimonials from the API
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/feedback');
        const data = await response.json();
        setTestimonials(data.feedbacks);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section
      id="testimonials"
      className="mt-6 border-gray-500 md:border-0 pt-12 md:my-20 content-center"
      style={{ height: '100vh' }}
    >
      <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center font-playfair">
        What Our Users Say
      </h3>
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold font-poppins">{testimonial.name}</h4>
              <StarRating rating={testimonial.rating} isInteractive={false} />
            </div>
            <p className={`font-poppins ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {testimonial.message}
            </p>
          </div>
        ))}
        {/* Show ellipsis if there are more than 4 testimonials */}
        {testimonials.length > 4 && (
          <div className="text-center text-gray-500 text-2xl font-bold">. . .</div>
        )}
      </div>
    </section>
  );
}


// Feedback Form Section 

export function FeedbackForm({ darkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form data to allow for multiple submissions
        setFormData({
          name: "",
          email: "",
          message: "",
          rating: 0,
        });
        // Automatically close modal after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        const errorData = await response.json();
        alert(`Failed to submit feedback: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section
      id="feedback"
      // className="my-20 md:min-h-[90vh] flex items-center justify-center px-4"
      className="md:h-[100vh] content-center"
      style={{ height: '100vh' }}
    >
      <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center font-playfair">
          Leave Your Feedback
        </h3>

        {["name", "email", "message"].map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block mb-2 font-poppins capitalize"
            >
              {field}
            </label>
            <input
              type={
                field === "email"
                  ? "email"
                  : field === "message"
                    ? "textarea"
                    : "text"
              }
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded ${darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
                } transition-colors duration-300 font-poppins`}
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block mb-2 font-poppins">Your Rating</label>
          <StarRating rating={formData.rating} setRating={handleRatingChange} />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md font-poppins transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Submit Feedback
        </button>

      </form>

      {/* Success Popup - Top aligned with slide-in animation */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-5 inset-x-0 mx-auto w-full max-w-sm z-50"
          >
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold">Success!</h2>
              <p>Your response has been sent.</p>
              <p>Thank you for your valuable feedback!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
      showPopup("Copied to Clipboard!");
    })
    .catch(err => console.error('Failed to copy text: ', err));
};

const showPopup = (message) => {
  const popup = document.createElement('div');
  popup.innerText = message;

  popup.style.position = 'fixed';
  popup.style.bottom = '20px';
  popup.style.right = '20px';
  popup.style.backgroundColor = '#4CAF50';
  popup.style.color = 'white';
  popup.style.padding = '10px 20px';
  popup.style.borderRadius = '5px';
  popup.style.zIndex = '1000';
  popup.style.opacity = '0';
  popup.style.transition = 'opacity 0.5s ease-in-out';

  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    popup.style.opacity = '1';
  });

  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 500);
  }, 1000);
};