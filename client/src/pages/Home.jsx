import React, { useContext } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import { staticContext } from "../contexts/staticContext";

const Home = () => {
  const { gamesPrefixes, startGames, buyYourHouseDecor, computerPrefixes } =
    useContext(staticContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavBar />
      <Hero />

      {/* Start Games Section */}
      {startGames && startGames.length > 0 && (
        <CategorySection
          title="Start Your Games"
          items={startGames}
          discoverMoreLink="/prudocts/tech"
          discoverMoreText="Discover more in gaming products"
        />
      )}

      {/* Games Prefixes Section */}
      {gamesPrefixes && gamesPrefixes.length > 0 && (
        <CategorySection
          title="Gaming Accessories"
          items={gamesPrefixes}
          discoverMoreLink="/prudocts/tech"
          discoverMoreText="Discover more in gaming products"
        />
      )}

      {/* Computer Prefixes Section */}
      {computerPrefixes && computerPrefixes.length > 0 && (
        <CategorySection
          title="Computer & Electronics"
          items={computerPrefixes}
          discoverMoreLink="/prudocts/tech"
          discoverMoreText="Discover more in computer products"
        />
      )}

      {/* Buy Your House Decor Section */}
      {buyYourHouseDecor && buyYourHouseDecor.length > 0 && (
        <CategorySection
          title="Shop for your home essentials"
          items={buyYourHouseDecor}
          discoverMoreLink="/prudocts/home"
          discoverMoreText="Discover more in home products"
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Ecommerce Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
