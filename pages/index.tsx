import React from "react";
import Page from "@/components/Page";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const getStaticProps = async () => {
  console.log("[HOME PAGE] getStaticProps:");

  const products = await getProducts();

  return {
    props: {
      products,
    },
    // revalidate: 30,
    revalidate: parseInt(`${process.env.REVALIDATE_SECONDS}`),
  };
};

const HomePage = ({ products }: { products: any }) => {
  console.log("[HOME PAGE] render:", products);

  return (
    <Page title="Indoor Plants">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default HomePage;
