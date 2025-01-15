import TourInfo from '@/components/TourInfo';
import { getSingleTour } from '@/utils/action';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import axios from 'axios';
import SwiperCarousel from '@/components/SwiperCarousel'; 

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  // Fetch tour details
  const tour = await getSingleTour(params.id);

  if (!tour) {
    redirect('/tours');
  }

  let tourImages = [];
  try {
    const { data } = await axios.get(`${url}${tour.city}&per_page=5`);
    tourImages = data?.results || [];
  } catch (error) {
    console.error('Error fetching images:', error);
  }

  return (
    <div className="relative bg-base-200 min-h-screen">
      <div className="sticky top-0 z-50 bg-base-100 shadow-md px-6 py-3 flex items-center mb-4">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-focus font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0L4.586 11l3.707-3.707a1 1 0 011.414 1.414L7.414 11l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Tours
        </Link>
      </div>

      <div className="lg:mb-16">
        <SwiperCarousel images={tourImages} city={tour.city} />
      </div>

      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;