import Image from "next/image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/client";
import { useStore } from "../../store/store";
import css from "../../styles/flower.module.css"


export default function Flower({ flower }) {

  const src = urlFor(flower.image).url();
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  // Handle Quantity
  const handleQuantity = (type: string) => {
    type === "inc"
    ? setQuantity((prev) => prev + 1)
    : quantity === 1 ? null
    : setQuantity((prev) => prev - 1)
  }

  // Add to Cart function

  const addFlower = useStore((state) => state.addFlower)

  const addToCart = () => {
    addFlower({...flower, price: flower.price[size], quantity: quantity, size: size})
  }


  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image loader={() => src}
            alt="img"
            src={src}
            layout="fill"
            unoptimized
            objectFit="cover"
          />
        </div>
        {/* right side */}
        <div className={css.right}>
          <span>{flower.name}</span>
          <span>{flower.details}</span>
          <span>
            <span style={{ color: "var(--themeRed)" }}>
              $
            </span> {flower.price[`${size}`]}
          </span>
          <div className={css.size}>
            <div className={css.sizeVariants}>
              <div onClick={() => { setSize(0) }}
                className={size === 0 ? css.selected : ""}>
                Small
              </div>
              <div onClick={() => { setSize(1) }}
                className={size === 1 ? css.selected : ""}>
                Medium
              </div>
              <div onClick={() => { setSize(2) }}
                className={size === 2 ? css.selected : ""}>
                Large
              </div>
            </div>
          </div>
          {/* Quantity */}
          <div className={css.quantity}>
            <span>Quantity</span>
            <div className={css.counter}>
              <span className={css.arrow} onClick={()=>handleQuantity("dec")}>◀ </span>
              <span>{quantity}</span>
              <span className={css.arrow} onClick={()=>handleQuantity("inc")}> ▶</span>
            </div>
          </div>
        {/* Add to Cart */}
        <div className={`btn ${css.btn}`} onClick={addToCart}>
          Add to Cart
        </div>
        </div>
        <Toaster/>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="flower" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
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