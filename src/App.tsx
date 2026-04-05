import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ListPage from './pages/list';
import DetailPage from './pages/detail';

const router = createBrowserRouter([{
  path:'/',
  element: <Layout/>,
  children: [
    {
      index:true,
      element: <ListPage/>,
    },{
      path:'episode/:id',
      element:<DetailPage/>
    }
  ]
}])

export default function App() {
  return <RouterProvider router={router} />;
}