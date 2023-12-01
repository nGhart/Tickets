import React from "react";

function Pagination({ currentPage, setCurrentPage, tickets, itemsPerPage }) {
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const itemsShown = tickets.slice(firstIndex, lastIndex);
  const noPages = Math.ceil(tickets.length / itemsPerPage);

  const displayPages = () => {
    const pagesToShow = 5; // You can adjust this based on your preference
    const numbers = [];

    if (noPages <= pagesToShow) {
      for (let i = 1; i <= noPages; i++) {
        numbers.push(i);
      }
    } else {
      const midPoint = Math.ceil(pagesToShow / 2);
      const startPage =
        currentPage <= midPoint ? 1 : currentPage - midPoint + 1;
      const endPage = startPage + pagesToShow - 1;

      numbers.push(1);
      if (startPage > 2) {
        numbers.push("..."); // Ellipsis
      }

      for (let i = startPage; i < endPage && i <= noPages - 1; i++) {
        numbers.push(i);
      }

      if (endPage < noPages - 1) {
        numbers.push("..."); // Ellipsis
      }

      numbers.push(noPages);
    }

    return numbers;
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== noPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div className="pagination">
      <div className="page">
        <div className="pageContainer">
          <div className="prev">
            <i onClick={prevPage}>Prev</i>
          </div>
          {displayPages().map((item, index) => (
            <div
              key={index}
              className={`${
                item === currentPage || item === "..." ? "activePage" : "pages"
              }`}
            >
              <i
                onClick={() =>
                  typeof item === "number" ? changePage(item) : null
                }
              >
                {item}
              </i>
            </div>
          ))}
          <div className="next">
            <i onClick={nextPage}>Next</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
