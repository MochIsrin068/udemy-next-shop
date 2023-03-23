import Link from "next/link";
import Image from "next/image";
import React from "react";

type TProps = {
  product: any;
};

export default function ProductCard({ product }: TProps) {
  return (
    <div className="border w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        {/* <img src={product.pictureUrl} alt="" /> */}
        <Image src={product.pictureUrl} alt="" height={240} width={320} />
        <div className="p-2 flex justify-between items-baseline">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <span>{product.price}</span>
        </div>
      </Link>
    </div>
  );
}
