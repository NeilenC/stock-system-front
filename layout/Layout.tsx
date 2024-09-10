import React from "react";
import NavbarComponent from "../components/From-Nabvar/Navbar/NavbarComponent";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const router = useRouter();

  if (router.pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarComponent />
      <main>{children}</main>
    </>
  );
};

export default Layout;
