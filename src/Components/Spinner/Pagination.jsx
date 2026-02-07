const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-full font-bold transition-all ${
          currentPage === 1
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-yellow-500 text-black hover:bg-yellow-600 hover:scale-105'
        }`}
      >
        ← Prev
      </button>
      
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`px-4 py-2 rounded-full font-bold transition-all ${
            currentPage === idx + 1
              ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-black scale-110'
              : 'bg-gray-800 text-yellow-400 hover:bg-yellow-900/10 hover:scale-105'
          }`}
        >
          {idx + 1}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-full font-bold transition-all ${
          currentPage === totalPages
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-yellow-500 text-black hover:bg-yellow-600 hover:scale-105'
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;