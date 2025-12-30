import { FC } from 'react';

const QuoteSkeleton: FC = () => {
  return (
    <div
      className="min-h-screen w-screen p-20 flex flex-col justify-center text-white">
      <div className="animate-pulse grid grid-cols-3 md:grid-cols-4 md:p-40 gap-4">
        <div className="h-4 bg-gray-700 rounded col-span-3 md:col-span-4" />
        <div className="h-4 bg-gray-700 rounded col-span-2 md:col-span-2" />
        <div className="h-4 bg-gray-700 rounded col-span-1 md:col-span-1" />
        <div className="h-4 bg-gray-700 rounded col-span-1 md:col-span-1" />
        <div className="h-4 bg-gray-700 rounded col-span-2 md:col-span-1" />
        <div className="h-4 bg-gray-700 rounded col-span-1 md:col-span-3" />
        <div className="h-4 bg-gray-700 rounded col-span-1 md:col-span-3" />
        <div className="h-4 bg-gray-700 rounded col-span-1 md:col-span-1" />
        <div className="h-4 bg-gray-700 rounded col-span-3 md:col-span-4" />
        <div className="h-8 md:col-span-4" />
        <div className="h-4 bg-gray-700 rounded col-span-3 md:col-start-2 md:col-end-4" />
      </div>
    </div>
  );
}

export default QuoteSkeleton;
