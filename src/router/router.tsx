import React from 'react';
import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../page/login-page';
import Layout from '../layout/layout';
import UserPage from '../page/user-page/user-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<UserPage />} />
        </Route>
      </Routes>
    ),
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export default router;
