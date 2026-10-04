import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Root from './components/Root.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import NewYearPage from './pages/NewYearPage/NewYearPage.jsx'
import HolidaysPage from './pages/HolidaysPage/HolidaysPage.jsx'
import CustomCountdownPage from './pages/CustomCountdownPage/CustomCountdownPage.jsx'
import AboutPage from './pages/AboutPage/AboutPage.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'new-year', element: <NewYearPage /> },
      { path: 'holidays', element: <HolidaysPage /> },
      { path: 'custom', element: <CustomCountdownPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
