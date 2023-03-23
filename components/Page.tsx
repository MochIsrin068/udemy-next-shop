import Head from "next/head";
import React, { Component } from "react";
import Navbar from "./Navbar";
import Title from "./Title";

type TProps = {
  children: any;
  title: string;
};

export default function Page({ children, title }: TProps) {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="px-6 py-4">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
}
