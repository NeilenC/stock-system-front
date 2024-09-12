import { ReactNode } from "react";

export interface ModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
  title?: string;
  children: ReactNode;
  handleSave?: () => void;
  width?: string;
  height?: string;
  hideActions?: boolean;
  error?: string;
}
