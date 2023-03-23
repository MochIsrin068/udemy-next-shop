import { fetchJson } from "@/lib/api";

const { CMS_URL } = process.env;

const stripCartItem = (cartItem: any) => {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
    quantity: cartItem.quantity,
  };
};

const handlerGetCart = async (req: any, res: any) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
    return;
  }

  try {
    const carts = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    res.status(200).json(carts.map(stripCartItem));
  } catch (error) {
    res.status(401).end();
  }
};

const handlerPostCart = async (req: any, res: any) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }

  try {
    const { productId, quantity } = req.body;
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productId,
        quantity,
      }),
    });
    res.status(200).json({});
  } catch (error) {
    res.status(401).end();
  }
};

const handlerCart = async (req: any, res: any) => {
  switch (req.method) {
    case "GET":
      return handlerGetCart(req, res);
    case "POST":
      return handlerPostCart(req, res);
    default:
      res.status(405).end();
  }
};

export default handlerCart;

// NEXT CCHALLLENGEE IS DELETE THE ITEM CART
// NEXT CCHALLLENGEE IS UPDATE THE ITEM CART
// NEXT CCHALLLENGEE ADD THE CHEDCKOUT BUTTON TO CHECKOUT TO DIRECT PAYMENT PAGE AND DELETE ALL ITEM FROMTHE CART
//  stripe.com to show payment page
