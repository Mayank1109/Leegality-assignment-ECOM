import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { Layout } from "./components/layout";
import { ProductListing } from "./pages/productListing";
import { ProductDetail } from "./pages/productDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Every route nested here renders inside Layout's <Outlet /> */}
        <Route element={<Layout />}>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
