import Icons from "./Icons";
import ProptTypes from "prop-types";

export default function Pagination({
  totalPages,
  currentPage,
  pagesToShow,
  onPageChange,
}) {
  return (
    <div className="mb-4 flex justify-center self-center overflow-hidden rounded shadow-md">
      <button
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center bg-primary text-background disabled:bg-primary/60"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icons.ChevronLeft className="h-4 w-4" />
      </button>

      {/* Pages before current page */}
      {Array(Math.min(pagesToShow, currentPage - 1))
        .fill()
        .map((_, i) => (
          <button
            className="flex h-8 w-8 items-center justify-center bg-secondary text-text/50"
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

      {currentPage > pagesToShow + 1 && (
        <button
          disabled
          className="flex h-8 w-8 items-center justify-center bg-secondary text-text"
        >
          ...
        </button>
      )}

      {/* Current page */}
      <button
        disabled
        className="flex h-8 w-8 items-center justify-center bg-secondary font-semibold text-text"
      >
        {currentPage}
      </button>

      {currentPage < totalPages - pagesToShow && (
        <button
          disabled
          className="flex h-8 w-8 items-center justify-center bg-secondary text-text"
        >
          ...
        </button>
      )}

      {/* Pages after current page */}
      {Array(Math.min(pagesToShow, totalPages - currentPage))
        .fill()
        .map((_, i) => (
          <button
            className="flex h-8 w-8 items-center justify-center bg-secondary text-text/50"
            key={i + 1}
            onClick={() => onPageChange(totalPages - i)}
          >
            {totalPages - i}
          </button>
        ))
        .reverse()}

      <button
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center bg-primary text-background disabled:bg-primary/60"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icons.ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: ProptTypes.number.isRequired,
  currentPage: ProptTypes.number.isRequired,
  pagesToShow: ProptTypes.number.isRequired,
  onPageChange: ProptTypes.func.isRequired,
};
