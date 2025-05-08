import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-800 to-blue-900 text-white px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-2">
          <span>🌟</span>
          Find your Zodiac Sign
          <span>🌟</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-indigo-200">
          Discover your cosmic blueprint through ancient Vedic astrology. Uncover your Rasi, Lagnam, and Dasa-Bhukti for insights into your life’s journey.
        </p>
      </motion.div>
    </div>
  );
}
