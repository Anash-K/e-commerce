import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommonLayout from '../components/layout/CommonLayout';
import CustomLoader from '../components/common/CustomLoader';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const CartPage = lazy(() => import('../pages/Cart'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<CustomLoader text="Loading page..." />}>
        <Routes>
          <Route path="/" element={<CommonLayout><Home /></CommonLayout>} />
          <Route path="/cart" element={<CommonLayout><CartPage /></CommonLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
