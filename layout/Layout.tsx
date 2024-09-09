import React from 'react';
import NavbarComponent from '../components/From-Nabvar/Navbar/NavbarComponent';

const Layout = ({ children }: any) => {
 
  return (
    <>
    <NavbarComponent/>
      <main>{children}</main>
    </>
  );
};

export default Layout;
