'use client';

import { getAllTours } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';
import ToursList from './ToursList';
import { useState } from 'react';
import waterfallImage from '../app/(dashboard)/tours/waterfall.jpg';
import Loading from './loading';

const ToursPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isPending } = useQuery({
    queryKey: ['tours', searchValue],
    queryFn: () => getAllTours(searchValue),
  });

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Header Section */}
      <header
        className="relative h-80 bg-cover bg-center rounded-lg mt-4 mx-4"
        style={{ backgroundImage: `url(${waterfallImage.src})`,  backgroundPosition: 'center 50%' }}
      >
        <div className="rounded-lg absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Find the perfect tour
          </h1>
          <p className="text-lg text-white mb-6">
            Discover the best attractions, neighborhoods, and hidden gems with our local guides.
          </p>
          <div className="join w-full max-w-lg mt-12">
            <input
              type="text"
              placeholder="Search experiences"
              className="input input-bordered join-item w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-primary join-item px-6 py-2 rounded-3xl hover:bg-white"
              disabled={isPending}
              onClick={() => setSearchValue('')}
            >
              {isPending ? 'please wait...' : 'Search'}
            </button>
          </div>
        </div>
      </header>

      {/* Popular Cities Section */}
      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 inline-block">Popular cities</h2>
        {isPending ? (
          <Loading />
        ) : (
          <ToursList data={data} />
        )}
      </section>
    </div>
  );
};

export default ToursPage;
