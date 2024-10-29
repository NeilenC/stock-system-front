import { useState } from "react";
import { MaterialProps } from "../../materialsProps";

const usePagination = (items: MaterialProps[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    currentItems,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;
