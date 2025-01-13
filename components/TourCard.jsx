import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UNSPLASH_API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
const UNSPLASH_URL = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&query=`;

const TourCard = ({ tour }) => {
  const { city, id, country } = tour;
  const [thumbnail, setThumbnail] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${UNSPLASH_URL}${city}&per_page=1`);
        const image = response.data.results[0]?.urls?.regular;
        setThumbnail(image);
      } catch (error) {
        console.error('Error fetching Unsplash image:', error);
        setIsError(true);
      }
    };

    fetchImage();
  }, [city]);

  return (
    <Link
      href={`/tours/${id}`}
      className="group relative flex flex-col rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
    >
      {/* Image */}
      {thumbnail && !isError ? (
        <Image
          src={thumbnail}
          alt={`${city} Thumbnail`}
          width={500}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400">Image Unavailable</span>
        </div>
      )}

    
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 group-hover:opacity-75 transition duration-500"></div>

     
      <div className="absolute bottom-6 left-6">
        <h2 className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-400 transition duration-300">
          {city}
        </h2>
        <p className="text-sm text-gray-300 group-hover:text-gray-100">
          {country}
        </p>
      </div>

      
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
    </Link>
  );
};

export default TourCard;
