import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./Components/Login/Login')),
  },
  {
    path: '/login',
    component: lazy(() => import('./Components/Login/Login')),
  },
  {
    path: '/library',
    component: lazy(() => import('./Components/Book/Book')),
  },
  {
    path: '/profile',
    component: lazy(() => import('./Components/Profile/Profile')),
  },
  {
    path: '/register',
    component: lazy(() => import('./Components/Register/Register')),
  },
  {
    path: '/settings',
    component: lazy(() => import('./Components/Settings/Settings')),
    children: [
      {
        path: 'change-email',
        component: lazy(() => import('./Components/Settings/ChangeEmail')),
      },
      {
        path: 'change-password', 
        component: lazy(() => import('./Components/Settings/ChangePassword')),
      },
      {
        path: 'change-username', 
        component: lazy(() => import('./Components/Settings/ChangeUsername')),
      },
    ],
  },
  {
    path: '**', // Catch-all for unmatched routes
    component: lazy(() => import('./Components/Login/Login')),
  },
];
