import React from 'react';
import { FaTint } from 'react-icons/fa';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">

            {/* Pulse Ring */}
            <div className="absolute w-32 h-32 rounded-full border-2 border-red-500 animate-ping opacity-30"></div>

            {/* Blood Drops */}
            <div className="flex gap-6 z-10">
                {[0, 1, 2, 3, 4].map((i) => (
                    <FaTint
                        key={i}
                        className="text-red-600 text-4xl animate-blood-premium drop-shadow-lg"
                        style={{ animationDelay: `${i * 0.18}s` }}
                    />
                ))}
            </div>

            {/* Text */}
            <p className="mt-6 text-lg font-semibold text-red-600 tracking-wide animate-pulse">
               A drop can save a life...
            </p>

            {/* Custom Animation */}
            <style>
                {`
          @keyframes blood-premium {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.5;
            }
            40% {
              transform: translateY(10px) scale(1.15);
              opacity: 1;
            }
            70% {
              transform: translateY(6px) scale(1.08);
            }
            100% {
              transform: translateY(0) scale(1);
              opacity: 0.5;
            }
          }

          .animate-blood-premium {
            animation: blood-premium 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}
            </style>
        </div>
    );
};

export default LoadingSpinner;