import { Toaster } from 'react-hot-toast';

const GlobalToaster = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        className: 'font-sans text-md text-bold',
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '8px',
          padding: '12px 20px',
        },
        success: {
          iconTheme: {
            primary: '#3B82F6',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default GlobalToaster;
