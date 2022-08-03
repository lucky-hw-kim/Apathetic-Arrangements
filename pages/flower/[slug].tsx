import { useState } from "react";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/client";
import css from "../../styles/flower.module.css"

export default function Flower({flower}) {
  console.log(flower);
  
  const src = urlFor(flower.image).url();
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  // Handle Quantity

  // Add to Cart function

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <span>◀</span> 
          <span>{quantity}</span>
          <span>▶</span> 
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="flower" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug: string) => ({ params: { slug }})),
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const flower = await client.fetch(
    `*[_type=="flower" && slug.current == '${slug}'][0]`
  );
  return {
    props: {
      flower,
    },
  }
  
}