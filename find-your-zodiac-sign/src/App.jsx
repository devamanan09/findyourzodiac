import React from "react";
import HeroSection from "./components/HeroSection";
import BirthDetailsForm from "./components/BirthDetailsForm";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">
        ✴️ Find your Zodiac Sign ✴️
      </h1>
      <p className="text-lg text-gray-300 text-center mb-8">
        Discover your cosmic blueprint through ancient Vedic astrology. Uncover
        your Rasi, Lagnam, and Dasa-Bhukti periods for insights into your life's
        journey.
      </p>
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
      
        <BirthDetailsForm />
      </div>
    </div>
  );
};

export default App;
