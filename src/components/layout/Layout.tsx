
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
