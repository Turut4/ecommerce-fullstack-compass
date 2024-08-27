import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onSetPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onSetPage,
}: PaginationProps) {
  const maxPageLinks = 1;
  const startPage = Math.max(1, currentPage - maxPageLinks);
  const endPage = Math.min(totalPages, currentPage + maxPageLinks);

  // Gera uma lista de páginas a serem exibidas
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  return (
    <div className="pages">
      {currentPage > 1 && (
        <button className="previous" onClick={() => onSetPage(currentPage - 1)}>
          Previous
        </button>
      )}
      {pages.map((page) => (
        <button
          className={`page ${page === currentPage ? 'active' : ''}`}
          key={page}
          onClick={() => onSetPage(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button className="next" onClick={() => onSetPage(currentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );
}
