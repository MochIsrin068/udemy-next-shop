// OPTION 1B TO FETCH THE PRODUCT ON THE SERVER SIDE
// BUT WITH INSCREMENTAL STATIC REGENERATION ( getStaticProps )

import Title from "@/components/Title";
import { getProducts } from "@/lib/products";
import Head from "next/head";
import React, { PropsWithChildren } from "react";

export const getStaticProps = async () => {
  console.log("[HOME PAGE] getStaticProps:");

  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: 30, // second ( re recquest props after revalidate second)
  };
};

const HomePage = ({ products }: { products: any }) => {
  console.log("[HOME PAGE] render:", products);

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>

      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product: any) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
