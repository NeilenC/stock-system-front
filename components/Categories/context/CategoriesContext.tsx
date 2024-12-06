import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
// import useMaterialsFilter from "../Hooks/useMaterialsFilter";
export interface CategoryProps {
  category_name: string;
  name: string;
}
type CategoriesContextType = {
  categories: CategoryProps[];
  currentCategories: CategoryProps[];
  addCategory: (category: CategoryProps) => void;
  fetchCategories: () => void;
  handleFilter: (filter: any) => void; // Adjust the type based on your filter
  handlePageChange: (page: number) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  updateItemsPerPage: (items: number) => void;
};

const initialFilters = {
  name: "",
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Add a function to update items per page
  const updateItemsPerPage = (items: number) => {
    setItemsPerPage(items);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials-category`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = (category: CategoryProps) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const filteredCategories = useMemo(() => {
    let filtered = categories;

    if (filters.name) {
      filtered = filtered.filter((category) =>
        category?.category_name
          .toLowerCase()
          .includes(filters.name.toLowerCase())
      );
    }

    // Reset page if filtered results don't reach the current page
    if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(1);
    }

    return filtered;
  }, [categories, filters, currentPage, itemsPerPage]);

  const currentCategories = useMemo(() => {
    return filteredCategories.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredCategories, currentPage, itemsPerPage]);

  const totalItems = filteredCategories.length;

  const handleFilter = (newFilters: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        currentCategories,
        addCategory,
        fetchCategories,
        handleFilter,
        handlePageChange,
        currentPage,
        itemsPerPage,
        totalItems,
        updateItemsPerPage,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);
  if (!context)
    throw new Error("useMaterials must be used within a MaterialsProvider");
  return context;
};
