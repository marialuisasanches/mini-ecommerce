import { Toaster } from 'sonner';

import { ProductsPage } from '@/pages/ProductsPage';

function App(): JSX.Element {
  return (
    <>
      <ProductsPage />
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}

export default App;
