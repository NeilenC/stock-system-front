export interface DrawerBookingProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }

  // SectionComponent.tsx
  export interface SectionComponentProps {
  title: string;
  secondTitle: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}
