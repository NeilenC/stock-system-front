import Image from "next/image";

const IconToImage = ({ icon, w, h, onClick }: any) => {
  return (
    <div onClick={onClick} >
      <Image src={icon} alt="Icon" width={w} height={h} />
    </div>
  );
};

export default IconToImage;
