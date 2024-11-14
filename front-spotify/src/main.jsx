import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHome from './pages/admin/AdminHome';
import AlbumList from './pages/admin/AlbumList';
import AlbumDetail from './pages/admin/AlbumDetail';
import CancionList from './pages/admin/CancionList';
import CancionDetail from './pages/admin/CancionDetail';
import ArtistaList from './pages/admin/ArtistaList';
import ArtistaDetail from './pages/admin/ArtistaDetail';
import GeneroList from './pages/admin/GeneroList';
import GeneroDetail from './pages/admin/GeneroDetail';
import HomePage from './pages/users/HomePage';
import SearchResultsPage from './pages/users/SearchResultsPage';
import GeneroDetailPage from './pages/users/GeneroDetailPage';
import ArtistaDetailPage from './pages/users/ArtistaDetailPage';
import CancionesPage from './pages/users/CancionPage';
import AlbumsPage from './pages/users/AlbumsPage';
import AlbumDetailPage from './pages/users/AlbumDetailPage';
import ArtistasPage from './pages/users/ArtistasPage';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminHome />,
  },
  {
    path: '/admin/albums',
    element: <AlbumList />,
  },
  {
    path: '/admin/album/editar/:id',
    element: <AlbumDetail />,
  },
  {
    path: '/admin/album/agregar',
    element: <AlbumDetail />,
  },
  {
    path: '/admin/canciones',
    element: <CancionList />,
  },
  {
    path: '/admin/cancion/editar/:id',
    element: <CancionDetail />,
  },
  {
    path: '/admin/cancion/agregar',
    element: <CancionDetail />,
  },
  {
    path: '/admin/artistas',
    element: <ArtistaList />,
  },
  {
    path: '/admin/artista/editar/:id',
    element: <ArtistaDetail />,
  },
  {
    path: '/admin/artista/agregar',
    element: <ArtistaDetail />,
  },
  {
    path: 'admin/generos',
    element: <GeneroList />,
  },
  {
    path: 'admin/genero/editar/:id',
    element: <GeneroDetail />,
  },
  {
    path: 'admin/genero/agregar',
    element: <GeneroDetail />,
  },
  // rutas de usuario regular
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
  {
    path: '/genero/:id',
    element: <GeneroDetailPage />,
  },
  {
    path: '/artista/:id',
    element: <ArtistaDetailPage />,
  },
  {
    path: '/canciones',
    element: <CancionesPage />,
  },
  {
    path: '/albums',
    element: <AlbumsPage />,
  },
  {
    path: '/album/:id',
    element: <AlbumDetailPage />,
  },
  {
    path: '/artistas',
    element: <ArtistasPage />,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
