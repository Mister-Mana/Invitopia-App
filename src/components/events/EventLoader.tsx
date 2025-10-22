
import React from 'react';

const EventLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-invitopia-50">
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Cover Image Skeleton */}
        <div className="h-48 md:h-64 lg:h-80 w-full bg-gray-200 animate-pulse rounded-lg mb-8"></div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Title Skeleton */}
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg mb-6 max-w-2xl"></div>
          
          {/* Event Details Skeleton */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="h-5 w-5 bg-gray-200 animate-pulse rounded mr-3 mt-0.5"></div>
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 animate-pulse rounded max-w-xs"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded max-w-24"></div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 bg-gray-200 animate-pulse rounded mr-3 mt-0.5"></div>
              <div className="h-5 bg-gray-200 animate-pulse rounded max-w-sm"></div>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 bg-gray-200 animate-pulse rounded mr-3 mt-0.5"></div>
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 animate-pulse rounded max-w-32"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded max-w-48"></div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar Skeleton */}
          <div className="h-2 bg-gray-200 animate-pulse rounded-full mb-8"></div>
          
          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 animate-pulse rounded max-w-64"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded max-w-4/5"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded max-w-3/5"></div>
          </div>
          
          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <div className="h-10 bg-gray-200 animate-pulse rounded px-8"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded px-8"></div>
          </div>
        </div>
        
        {/* Organizer Skeleton */}
        <div className="mt-8 text-center">
          <div className="h-4 bg-gray-200 animate-pulse rounded max-w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default EventLoader;
