'use client';

import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getExistingTour, generateTourResponse, createNewTour } from "@/utils/action";
import TourInfo from "./TourInfo";
import toast from "react-hot-toast";
import Loading from "./loading";
import newTourImage from '../app/(dashboard)/tours/generateTourImage.jpg';

const NewTour = () => {
  const trendingRef = useRef(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const autoScrollRef = useRef(null);
  const [trendingTours, setTrendingTours] = useState([]);
  const [formData, setFormData] = useState({ city: "", country: "" });
  const [isPaused, setIsPaused] = useState(false); 
  const queryClient = useQueryClient();

  const handleMouseDown = (e) => {
    const slider = trendingRef.current;
    dragState.current.isDragging = true;
    dragState.current.startX = e.pageX || e.touches[0].pageX;
    dragState.current.scrollLeft = slider.scrollLeft;
    slider.classList.add("dragging");
    setIsPaused(true); 
  };

  const handleMouseMove = (e) => {
    if (!dragState.current.isDragging) return;
    const slider = trendingRef.current;
    const x = e.pageX || e.touches[0].pageX;
    const walk = x - dragState.current.startX;
    slider.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    dragState.current.isDragging = false;
    if (trendingRef.current) {
      trendingRef.current.classList.remove("dragging");
    }
    setIsPaused(false); 
  };

  const startAutoScroll = () => {
    autoScrollRef.current = setInterval(() => {
      if (!trendingRef.current || isPaused) return;
      trendingRef.current.scrollLeft += 1; 
    }, 20);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollRef.current);
  };

  useEffect(() => {
    startAutoScroll();

    return () => stopAutoScroll(); 
  }, [isPaused]);

  const { mutate, isPending, data: tour } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;

      const newTour = await generateTourResponse(destination);
      if (newTour) {
        const response = await createNewTour(newTour);
        console.log(response);

        queryClient.invalidateQueries({ queryKey: ['tours'] });
        return newTour;
      }
      toast.error('No matching city found...');
      return null;
    },
  });

  const fetchTrendingImages = async () => {
    const cities = [
      { name: "Paris", country: "France", highlights: "Eiffel Tower, Seine River Cruise, The Louvre" },
      { name: "New York City", country: "USA", highlights: "Empire State Building, Central Park, Times Square" },
      { name: "Dubai", country: "UAE", highlights: "Burj Khalifa, Dubai Fountain Show, Desert Safari" },
      { name: "Barcelona", country: "Spain", highlights: "Sagrada Familia, Park Guell, La Rambla" },
      { name: "Cape Town", country: "South Africa", highlights: "Table Mountain, Robben Island, Cape Peninsula" },
      { name: "Tokyo", country: "Japan", highlights: "Shibuya Crossing, Tsukiji Fish Market, Akihabara" },
      { name: "Sydney", country: "Australia", highlights: "Sydney Opera House, Bondi Beach, The Rocks" },
      { name: "Rome", country: "Italy", highlights: "Colosseum, Vatican City, Trevi Fountain" },
      { name: "Rio de Janeiro", country: "Brazil", highlights: "Christ the Redeemer, Copacabana Beach, Sugarloaf Mountain" },
      { name: "Istanbul", country: "Turkey", highlights: "Hagia Sophia, Blue Mosque, Grand Bazaar" },
    ];

    try {
      const results = await Promise.all(
        cities.map(async (city) => {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${city.name}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
          );
          const data = await response.json();
          return {
            ...city,
            imageUrl: data.results[0]?.urls?.small || "",
          };
        })
      );
      setTrendingTours(results);
    } catch (error) {
      console.error("Failed to fetch Unsplash images", error);
    }
  };

  useEffect(() => {
    fetchTrendingImages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleCardClick = (city, country) => {
    setFormData({ city, country });
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
     <div
  className="relative bg-cover bg-center text-white py-12 px-4 mx-auto max-w-6xl"
  style={{ backgroundImage: `url(${newTourImage.src})` }}
>
  <div className="absolute inset-0 bg-black bg-opacity-30"></div> 
  <div className="relative mx-auto rounded-lg overflow-hidden flex flex-col text-center max-w-screen-md">
    <h1 className="text-4xl font-bold">
      Find unforgettable tours and activities for your next trip
    </h1>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="join">
        <input
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />
        <input
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="Country"
          name="country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
        />
        <button className="btn btn-primary join-item" type="submit">
          Generate Tour
        </button>
      </div>
    </form>
  </div>
</div>

      <div className="mx-auto mt-16 max-w-6xl px-4 scrollbar-hide w-screen overflow-x-hidden">
  {tour ? <TourInfo tour={tour} /> : null}
  <h2 className="text-4xl font-bold mb-10 text-center text-gradient bg-gradient-to-r from-blue-500 to-purple-500 inline-block">
    Explore Trending Tours
  </h2>


  <div className="relative">
    <div
      ref={trendingRef}
      className="flex gap-6 overflow-x-auto scrollbar-hide"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUpOrLeave}
    >
      {trendingTours.map((tour, index) => (
        <div
          key={index}
          className="group relative flex-shrink-0 w-80 h-96 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:-translate-y-4 hover:scale-105 cursor-pointer"
          onClick={() => handleCardClick(tour.name, tour.country)}
        >
          <img
            src={tour.imageUrl}
            alt={tour.name}
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-6 bg-gradient-to-t from-black/70 via-transparent to-transparent">
            <h3 className="text-xl font-bold text-white mb-2">{tour.name}</h3>
            <p className="text-sm text-gray-300 italic">{tour.country}</p>
            <p className="text-sm text-gray-200 mt-4">{tour.highlights}</p>
          </div>
          <div className="absolute inset-0 rounded-lg border border-white/20 shadow-[0_0_50px_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_60px_15px_rgba(255,255,255,0.2)] transition-shadow duration-300"></div>
        </div>
      ))}
    </div>
    <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none"></div>
  </div>
</div>

    </>
  );
};

export default NewTour;
