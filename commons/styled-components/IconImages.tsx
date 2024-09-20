import Image from "next/image";

const IconToImage = ({icon, w, h}: any) => {
  return <Image src={icon} alt="Icon" width={w} height={h} />;
};

export default IconToImage;
