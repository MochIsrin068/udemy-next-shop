import { fetchJson } from "./api";

// const CMS_URL = "http://localhost:1337";
const { CMS_URL } = process.env;

export const getProduct = async (id: string) => {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
};

export const getProducts = async () => {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map(stripProduct);
};

const stripProduct = (product: any) => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: `$${product.price.toFixed(2)}`,
    pictureUrl: `${CMS_URL}${product.picture.url}`,
  };
};
