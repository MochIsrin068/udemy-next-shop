// OPTION 2a TO FETCH THE PRODUCT ON THE CLIENT SIDE ( in useEfffect )
// directly from an external API

import Title from "@/components/Title";
import { getProducts } from "@/lib/products";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const products = [
  { id: 1, title: "First Product" },
  { id: 2, title: "Second Product" },
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Array<any>>([]);

  useEffect(() => {
    getProducts().then(setProducts);
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
