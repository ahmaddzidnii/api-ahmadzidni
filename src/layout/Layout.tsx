import NavbarComponent from '@/components/Navbar/NavbarComponent';
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
      <NavbarComponent/>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>Hak Cipta © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
