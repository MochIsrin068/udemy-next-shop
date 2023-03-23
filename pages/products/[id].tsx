import AddToCartWidget from "@/components/AddToCartWidget";
import Page from "@/components/Page";
import { useUser } from "@/hooks/user";
import { ApiError } from "@/lib/api";
import { getProduct, getProducts } from "@/lib/products";
import Image from "next/image";
import React from "react";

export const getStaticPaths = async () => {
  const products = await getProducts();

  return {
    paths: products.map((product: any) => ({
      params: {
        id: `${product.id}`,
      },
    })),
    fallback: "blocking", // can show new data updated
    // fallback: false, // not found
  };
};

export const getStaticProps = async (context: any) => {
  //   handle error with try catch
  try {
    const id = context.params.id;
    const product = await getProduct(id);
    return {
      props: {
        product,
      },
      //   revalidate: 30,
      revalidate: parseInt(`${process.env.REVALIDATE_SECONDS}`),
    };
  } catch (error) {
    // show the 404 page
    // return {
    //   notFound: true,
    // };

    // for show throw error
    if (error instanceof ApiError && error.status === 404) {
      return { notFound: true };
    }

    throw error;
  }
};

const ProductDetail = ({ product }: any) => {
  console.log("[PRODUCT PAGE] render:", product);

  const user = useUser();

  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.pictureUrl} alt="" height={640} width={480} />
        </div>
        <div className="flex-1 lg:ml-4 mt-2 lg:mt-0">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
          {user && <AddToCartWidget productId={product.id} />}
        </div>
      </div>
    </Page>
  );
};

export default ProductDetail;
