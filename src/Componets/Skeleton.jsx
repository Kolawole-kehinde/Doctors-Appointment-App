// SkeletonShowcaseCard.jsx
const SkeletonShowcaseCard = ({ count = 6 }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse p-4 bg-gray-200 rounded-lg shadow-md"
          >
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-24 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SkeletonShowcaseCard;
  