"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main 
      className="min-h-screen text-white flex flex-col items-center justify-center p-6 relative overflow-hidden" // Added relative and overflow-hidden
      style={{
        // Using the cute puppy image as requested
        backgroundImage: 'url("https://cdn.wallpapersafari.com/52/64/MjEnvk.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
   
      <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"></div>

      {/* Main Content Container - Makes content stand out */}
      <div className="relative z-10 p-10 max-w-xl text-center bg-transparent backdrop-blur-md rounded-3xl shadow-3xl border border-gray-100 border-opacity-20 transform transition duration-500 hover:scale-[1.02]">
        
        {/* Animated Gradient Title */}
        <h1 
          className="text-6xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-400 drop-shadow-2xl animate-pulse-slow"
        >
          Welcome to Task Flow
        </h1>
        
        {/* Description Text with better contrast */}
        <p className="text-xl text-gray-100 mb-10 max-w-md mx-auto font-light leading-relaxed">
          Manage your tasks efficiently and never forget anything. Your productivity journey starts here.
        </p>
        
        {/* Call to Action Button */}
        <Link
          href="/todos"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition px-10 py-5 rounded-full font-bold shadow-2xl text-xl uppercase tracking-wider transform hover:scale-110 active:scale-95 duration-300 ring-4 ring-white ring-opacity-30"
        >
          Go to Todo List
        </Link>

      </div>
    </main>
  );
}