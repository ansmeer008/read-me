import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ListPage from './pages/list';
import DetailPage from './pages/detail';
import WritePage from './pages/write';
import EditPage from './pages/edit';
import GlobalToaster from './components/GlobalToaster';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ListPage />,
      },
      {
        path: 'episode/:id',
        element: <DetailPage />,
      },
      {
        path: 'write',
        element: <WritePage />,
      },
      {
        path: 'edit',
        element: <EditPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <GlobalToaster />
      <RouterProvider router={router} />
    </>
  );
}
