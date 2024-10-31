// sectorStore.ts
import {create} from 'zustand';
import { SectorType } from '../components/sectors/enum';

interface SectorData {
  name: string;
  square_meters: number;
  number_of_bathrooms: number;
  sector: SectorType | "";
  description: string;
  is_active?:boolean;
}

interface SectorStore {
  sectorData: SectorData;
  setSectorData: (data: Partial<SectorData>) => void;
  resetSectorData: () => void;
}

export const useSectorStore = create<SectorStore>((set) => ({
  sectorData: {
    name: "",
    square_meters:0,
    number_of_bathrooms: 0,
    sector: "",
    description: "",
  is_active:true

  },
  setSectorData: (data) =>
    set((state) => ({
      sectorData: { ...state.sectorData, ...data },
    })),
  resetSectorData: () =>
    set({
      sectorData: {
        name: "",
        square_meters: 0,
        number_of_bathrooms: 0,
        sector: "",
        description: "",
        is_active:true
      },
    }),
}));
