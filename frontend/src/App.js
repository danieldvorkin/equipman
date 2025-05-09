import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BaseLayout from './baseLayout';
import { loader } from './loaders/baseLoader';
import { loader as homeLoader } from './loaders/homeLoader';
import { loader as adminLoader } from './loaders/adminLoader';
import { loader as accountLoader } from './loaders/accountLoader';
import { loader as usersLoader } from './loaders/usersLoader';
import { kitDetailLoader, loader as kitsLoader } from './loaders/kitsLoader';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import { loginAction } from './pages/login/loginAction';
import { registerAction } from './pages/register/registerAction';
import ErrorPage from './pages/error/Error';
import AdminLayout from './adminLayout';
import Account from './pages/account/Account';
import Users from './pages/admin/users/Users';
import User from './pages/admin/users/User';
import Kits from './pages/admin/kits/Kits';
import Kit from './pages/admin/kits/Kit';
import NewKit from './pages/admin/kits/NewKit';
import { addKitAction } from './pages/admin/kits/actions/addKitAction';
import KitShow from './pages/kits/KitShow';

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
          path: "/kits/:kitId",
          element: <KitShow />,
          loader: kitDetailLoader,
        },
        {
          path: "/kits",
          element: <Kits />,
          loader: kitsLoader,
          shouldRevalidate: () => {
            return true;
          }
        },
        {
          path: "/account",
          element: <Account />,
          loader: accountLoader
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
      ],
      errorElement: <ErrorPage />
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      loader: adminLoader,
      children: [
        {
          path: "kits",
          element: <Kits />,
          loader: kitsLoader,
          shouldRevalidate: () => {
            return true;
          },
        },
        {
          path: "kits/:kitId",
          element: <Kit />
        },
        {
          path: "kits/new",
          element: <NewKit />,
          action: addKitAction
        },
        {
          path: "users",
          element: <Users />,
          loader: usersLoader
        },
        {
          path: "users/:userId",
          element: <User />,
        }
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
