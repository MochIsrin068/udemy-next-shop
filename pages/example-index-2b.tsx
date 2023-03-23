// OPTION 2b TO FETCH THE PRODUCT ON THE CLIENT SIDE ( in useEfffect )
// from an internal API route

import Title from "@/components/Title";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/products");
      const products = await response.json();
      setProducts(products);
    })();
  }, []);

  console.log("[HOME PAGE] render:", products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>

      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
