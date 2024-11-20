import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
export interface FiltersState {
  activity_name: string;
  type_activity: string;
  client_email: string;
  state: string;
  responsible_name: string;
  initial_date: string;
  end_date: string;
  cwa_number: string;
  type_of_contract: string;
}

type ActivityContextType = {
  activities: FiltersState[];
  currentActivities: FiltersState[];
  addActivity: (material: FiltersState) => void;
  setActivities: React.Dispatch<React.SetStateAction<FiltersState[]>>;
  // addActiv: (material: FiltersState) => void;
  fetchActivities: () => void;
  handleFilter: (filter: any) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  updateItemsPerPage: (items: number) => void;
};

const initialFilters = {
  activityName: "",
  clientPhone: "",
  clientEmail: "",
  typeActivity: "",
  state: "",
  responsible: "",
  initialDate: "",
  endDate: "",
  cwaNumber: "",
  typeOfContract: "",
};

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activities, setActivities] = useState<FiltersState[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Add a function to update items per page
  const updateItemsPerPage = (items: number) => {
    setItemsPerPage(items);
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/active`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const addActivity = (activity: FiltersState) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };

  const filteredActivities = useMemo(() => {
    let filtered = activities;
    if (filters.activityName) {
      filtered = filtered.filter((act) =>
        act.activity_name
          .toLowerCase()
          .includes(filters.activityName.toLowerCase())
      );
    }

    if (filters.typeActivity) {
      filtered = filtered.filter((act) =>
        act.type_activity
          .toLowerCase()
          .includes(filters.typeActivity.toLowerCase())
      );
    }

    if (filters.responsible) {
      filtered = filtered.filter((act) =>
        act?.responsible_name
          ?.toLowerCase()
          .includes(filters.responsible.toLowerCase())
      );
    }
    if (filters.cwaNumber) {
      filtered = filtered.filter((act) =>
        String(act.cwa_number)?.includes(filters.cwaNumber)
      );
    }

    if (filters.typeOfContract) {
      filtered = filtered.filter((act) =>
        act.type_of_contract?.includes(filters.typeOfContract)
      );
    }

    if (filters.state) {
      filtered = filtered.filter((act) =>
        act?.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    if (filters.initialDate) {
      filtered = filtered.filter((act) =>
        act.initial_date.includes(filters.initialDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter((act) =>
        act.end_date.includes(filters.endDate)
      );
    }

    if (filters.clientEmail) {
      filtered = filtered.filter(
        (act) =>
          act.client_email &&
          String(act.client_email).includes(filters.clientEmail)
      );
    }

    if (filters.typeOfContract) {
      filtered = filtered.filter((act) =>
        act.type_of_contract
          .toLowerCase()
          .includes(filters.typeActivity.toLowerCase())
      );
    }
    
    // if (filters.depth) {
    //   filtered = filtered.filter((act) =>
    //     act.depth && String(act.depth).includes(filters.depth)
    //   );
    // }
    // if (filters.price) {
    //   filtered = filtered.filter((act) =>
    //     String(act.price).includes(filters.price)
    //   );
    // }
    // if (filters.observations) {
    //   filtered = filtered.filter((act) =>
    //     act.observations.toLowerCase().includes(filters.observations.toLowerCase())
    //   );
    // }

    // Reset page if filtered results don't reach the current page
    if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(1);
    }

    return filtered;
  }, [activities, filters, currentPage, itemsPerPage]);

  const currentActivities = useMemo(() => {
    return filteredActivities.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredActivities, currentPage, itemsPerPage]);

  const totalItems = filteredActivities.length;

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
    <ActivityContext.Provider
      value={{
        activities,
        currentActivities,
        fetchActivities,
        setActivities,
        addActivity,
        handleFilter,
        handlePageChange,
        currentPage,
        itemsPerPage,
        totalItems,
        updateItemsPerPage,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivitiesContext = () => {
  const context = useContext(ActivityContext);
  if (!context)
    throw new Error("useActivities must be used within a ActivitiesProvider");
  return context;
};
