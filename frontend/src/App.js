import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BaseLayout from './baseLayout';
import { loader } from './loaders/baseLoader';
import { loader as homeLoader } from './loaders/homeLoader';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import { loginAction } from './pages/login/loginAction';
import { registerAction } from './pages/register/registerAction';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      loader: loader,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: homeLoader
        },
        {
          path: "/home",
          element: <Home />,
          loader: homeLoader
        },
        {
          path: "/account",
          element: <div>Account</div>
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
