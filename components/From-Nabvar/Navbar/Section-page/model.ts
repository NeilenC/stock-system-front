import { StaticImageData } from "next/image";

export interface SectionComponentProps {
  icon: StaticImageData;
  secondaryIcon?: StaticImageData;
  buttonIcon?: StaticImageData;
  text: string;
  children?: React.ReactNode;
}
