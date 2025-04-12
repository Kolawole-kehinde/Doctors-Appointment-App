

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse p-4 bg-gray-200 rounded-xl shadow-md"
        >
          <div className="h-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader ;
