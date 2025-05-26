"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products, loading } = useAppContext();

  return (
    <>
      {loading ? (
        // Loading spinner
        <div className="flex items-center justify-center my-6">
          <div
            role="loading"
            class="flex items-center justify-center h-20 w-20 rounded-full animate-spin space-x-2 border-l-2 border-orange-700"
          ></div>
        </div>
      ) : (
        // Section for products
        <>
          <Navbar />
          <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
            <div className="flex flex-col items-end pt-12">
              <p className="text-2xl font-medium">All products</p>
              <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default AllProducts;
