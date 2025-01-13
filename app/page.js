'use client'; // Ensure this is at the top of the file

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Globe from 'react-globe.gl';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {SiOpenaigym} from 'react-icons/si';
import SignUpPage from './sign-up/[[...sign-up]]/page';
const Page = () => {
  const globeRef = useRef();

  useEffect(() => {
    AOS.init({ duration: 1200 });

    // Customize globe rotation
    const globe = globeRef.current;
    if (globe) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 1.5;
    }
  }, []);

  // Example data: Twinkling locations
  const locations = [
    { lat: 37.7749, lng: -122.4194, size: 1.5, color: 'yellow' }, // San Francisco
    { lat: 48.8566, lng: 2.3522, size: 1.5, color: 'lightblue' }, // Paris
    { lat: -33.8688, lng: 151.2093, size: 1.5, color: 'orange' }, // Sydney
    { lat: 28.6139, lng: 77.209, size: 1.5, color: 'green' }, // New Delhi
  ];

  // Example data: Flight paths
  const arcsData = [
    {
      startLat: 37.7749,
      startLng: -122.4194,
      endLat: 48.8566,
      endLng: 2.3522,
      color: 'cyan',
    },
    {
      startLat: 48.8566,
      startLng: 2.3522,
      endLat: -33.8688,
      endLng: 151.2093,
      color: 'orange',
    },
    {
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 28.6139,
      endLng: 77.209,
      color: 'purple',
    },
  ];

  return (
    <div className=' min-h-screen text-white relative overflow-hidden'>
      {/* Header */}
      <header className=' w-full flex justify-between items-center px-10 py-5  bg-opacity-50 backdrop-blur-lg relative z-10'>
        <div className='flex items-center justify-center'>
      <SiOpenaigym className='w-10 h-10 text-primary animate-spin-slow' />

      <h2 className="hidden md:block text-xl font-extrabold text-primary mr-auto ml-3 mt-2">
  {Array.from("Odyssey").map((char, index) => (
    <span key={index} className="letter-animate">
      {char}
    </span>
  ))}
</h2>

        </div>

        <nav className='flex space-x-6'>
          <Link
            href='/sign-up'
            className='btn btn-primary px-6 py-2 rounded-lg'
          >
            Sign Up
          </Link>
          <Link
            href='/sign-in'
            className='btn btn-secondary px-6 py-2 rounded-lg'
          >
            Log In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className='w-full px-10 py-20 flex flex-col md:flex-row items-center justify-center relative z-0'>
        {/* Left Content (Globe Animation) */}
        <div
          className='absolute -top-20 -left-[45%] md:right-[25%] w-[200%] h-full'
          style={{ boxShadow: '0 0 50px rgba(0, 255, 255, 0.6)' }}
        >
          <Globe
            ref={globeRef}
            globeImageUrl='//unpkg.com/three-globe/example/img/earth-dark.jpg'
            bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
            backgroundColor='rgba(0,0,20,1)'
            pointsData={locations}
            pointAltitude={(d) => d.size / 5}
            pointColor={(d) => d.color}
            arcsData={arcsData}
            arcColor={(d) => d.color}
            arcAltitude={(d) => 0.2}
            arcStroke={2}
            width={window.innerWidth * 2.2} // Dynamically sets the width to be 200% of the viewport
            height={window.innerHeight * 1.05} // Keeps height consistent with the viewport
            controls={() => ({
              enableZoom: false, // Disables zoom functionality
              enableRotate: true, // Retains auto-rotate
              autoRotateSpeed: 1.5,
            })}
          />
        </div>

        {/* Right Content */}
        <div className=' text-center md:text-left max-w-xl space-y-6 z-10 ml-12 mt-10'>
          <h1 className='text-5xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'>
            Experience AI-Generated Travel Like Never Before
          </h1>
          <p className='text-lg text-gray-400'>
            Plan your dream vacation with cutting-edge AI recommendations and
            interactive itineraries. Let’s make your journey unforgettable.
          </p>
          <div className='flex justify-center md:justify-start mt-6 space-x-4'>
            <Link
              href='/sign-up'
              className='btn btn-primary'
            >
              Get Started
            </Link>
            <Link
              href='/chat'
              className='btn btn-secondary'
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer
      <footer className='relative py-10 mt-24 bg-opacity-70 text-center z-50'>
        <p className='text-gray-400'>
          &copy; 2025 Tour AI. All rights reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default Page;
