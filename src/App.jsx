import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import PopularMovies from "./pages/PopularMovies";
import Favorities from "./pages/Favorities";
import Detail from "./pages/Detail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <PopularMovies />,
        },
        {
          path: "favorities",
          element: <Favorities />,
        },
        {
          path: "/movie/:id",
          element: <Detail />,
        },
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
