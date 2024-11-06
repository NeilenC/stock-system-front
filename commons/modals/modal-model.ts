import { ReactNode } from "react";

export interface ModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
  title?: string;
  children: ReactNode;
  onSubmit?: () => void;
  width?: string;
  height?: string;
  hideActions?: boolean;
  error?: string;
  fromDelete?: boolean;
  textButton?: string;
  loading?: boolean;

}
