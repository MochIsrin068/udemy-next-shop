import { getProducts } from "@/lib/products";

const handler = async (req: any, res: any) => {
  console.log("[/api/products] handler");
  const products = await getProducts();
  res.status(200).json(products);
};

export default handler;
