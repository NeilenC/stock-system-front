import React, { createContext, useContext, useState } from 'react';

interface ActivFiltersContextProps {
  activityName: string;
  clientPhone: string;
  clientEmail: string;
  typeActivity: string;
  state: string;
  responsible: string;
  initialDate: string;
  endDate: string;
  cwaNumber: string;
  typeOfContract: string;
  setActivityName: (value: string) => void;
  setClientPhone: (value: string) => void;
  setClientEmail: (value: string) => void;
  setTypeActivity: (value: string) => void;
  setState: (value: string) => void;
  setResponsible: (value: string) => void;
  setInitialDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setCWANumber: (value: string) => void;
  setTypeOfContract: (value: string) => void;

  clearFilters: () => void; // Agregar este método como parte del contexto
}

const ActivFiltersContext = createContext<ActivFiltersContextProps | undefined>(undefined);

export const FiltersActivProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activityName, setActivityName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [typeActivity, setTypeActivity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [responsible, setResponsible] = useState<string>('');
  const [initialDate, setInitialDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [cwaNumber, setCWANumber] = useState<string>('');
  const [typeOfContract, setTypeOfContract] = useState<string>('');

  const clearFilters = () => {
    setActivityName('');
    setClientPhone('');
    setClientEmail('');
    setTypeActivity('');
    setState('');
    setResponsible('');
    setInitialDate('');
    setEndDate('');
    setCWANumber('');
    setTypeOfContract('')
  };



  return (
    <ActivFiltersContext.Provider
      value={{
        activityName,
        clientPhone,
        clientEmail,
        typeActivity,
        state,
        responsible,
        initialDate,
        endDate,
        cwaNumber,
        typeOfContract,
        setActivityName,
        setClientPhone,
        setClientEmail,
        setTypeActivity,
        setState,
        setResponsible,
        setInitialDate,
        setEndDate,
        setCWANumber,
        setTypeOfContract,
        clearFilters,
      }}
    >
      {children}
    </ActivFiltersContext.Provider>
  );
};

export const useFiltersActivContext = () => {
  const context = useContext(ActivFiltersContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
};
