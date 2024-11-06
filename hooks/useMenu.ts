import { useState } from "react";

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dropdownMenu, setDropdownMenu] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    menu: string
  ) => {
    if (event.currentTarget instanceof HTMLElement) {
      setAnchorEl(event.currentTarget);
    }
    setDropdownMenu(menu);
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleCloseMenu = (menu: string) => {
    setAnchorEl(null);
    setDropdownMenu(null);
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [menu]: false,
    }));
  };

  return {
    anchorEl,
    dropdownMenu,
    openDropdowns,
    handleOpenMenu,
    handleCloseMenu,
  };
};

export default useMenu;
