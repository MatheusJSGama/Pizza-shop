import { AppLayout } from '@/pages/_layouts/app';
import { AuthLayout } from '@/pages/_layouts/auth';
import { Dashboard } from '@/pages/app/dashboard';
import { Orders } from '@/pages/app/orders/orders';
import { SignIn } from '@/pages/auth/sign-in';
import { SignUp } from '@/pages/auth/sign-up';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/Dashboard', element: <Dashboard /> },
      { path: '/Orders', element: <Orders /> }
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  
]);
