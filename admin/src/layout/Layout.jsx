import Header from './header/Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    {/* Full viewport height flex container */}
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Center container wrapper with max-w-6xl */}
      <div className="w-full max-w-6xl mx-auto flex flex-col min-h-screen">
        <Header />

        {/* Main content fills available vertical space */}
        <main className="flex-grow px-4 sm:px-10 lg:px-16 py-12">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  </>
);

export default Layout;