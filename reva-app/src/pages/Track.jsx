import React from 'react';
import { useParams } from 'react-router-dom';

const Track = () => {
  const { shortCode } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Tracking Link: {shortCode}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tracking logic is currently disabled in the homepage app.
        </p>
      </div>
    </div>
  );
};

export default Track;
