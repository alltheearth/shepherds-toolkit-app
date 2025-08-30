import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import SermonEditorPage from './feature/SermonsEditorPage';
import BiblePage from './feature/BiblePage';
import GlobalStyle from './styles/GlobalStyle';
import Header from './containers/Header';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
              <>
                <Header />
                <Outlet />
              </>
              ),
    children: [
      {
    path: "sermao",
    element: <SermonEditorPage />,
  },
  {
    path: "biblia",
    element: <BiblePage />
  }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GlobalStyle />
      <RouterProvider router={router} />
  </StrictMode>,
)

