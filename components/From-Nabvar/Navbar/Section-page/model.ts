import { StaticImageData } from "next/image";

export interface SectionComponentProps {
  icon: StaticImageData;
  secondaryIcon?: StaticImageData;
  buttonIcon?: StaticImageData;
  text: string;
  button?: React.ReactNode;
}
