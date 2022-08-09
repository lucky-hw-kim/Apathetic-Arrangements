import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { urlFor } from "../lib/client";
import { useStore } from "../store/store";
import css from "../styles/Cart.module.css";
import OrderModal from "../components/OrderModal"

const Cart = () => {
  const Router = useRouter();
  const [order, setOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem("order")
  );
  const [paymentMethod, setPaymentMethod] = useState(null);

  const CartData = useStore((state) => state.cart);

  const total = () => CartData.flowers.reduce((a, b) => a + b.quantity * b.price, 0)
  

  const removeFlower = useStore(state => state.removeFlower);

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== "undefined" &&
    localStorage.setItem('total', total())
  }

  const handleCheckout = async() => {
    setPaymentMethod(1);
    typeof window !== "undefined" && localStorage.setItem('total', total());
    const res = await fetch('api/stripe', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(CartData.flowers)
    })
    if(res.status === 500) return "server error"
    const data = await res.json();
    toast.loading("Redirecting...")
    Router.push(data.url)
  }

  const handleRemove = (i) => {
    removeFlower(i);
    toast.error("Item Removed")
  }


  return (
    <Layout>
      {typeof window !== "undefined" && (
        <div className={css.container}>
          {/* details */}
          <div className={css.details}>
            <table className={css.table}>
              <thead>
                <tr>
                  <th>Flower</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className={css.tbody}>
                {CartData.flowers.length > 0 &&
                  CartData.flowers.map((flower, i) => {
                    const src = urlFor(flower.image).url();
                    return (
                      <tr className={css.tr} key={i}>
                        <td className={css.imageTd}>
                          <Image
                            unoptimized
                            loader={() => src}
                            src={src}
                            alt="flower"
                            objectFit="cover"
                            width={85}
                            height={85}
                          />
                        </td>
                        <td>{flower.name}</td>
                        <td>
                          {flower.size === 0
                            ? "Small"
                            : flower.size === 1
                            ? "Medium"
                            : "Large"}
                        </td>
                        <td>{flower.price}</td>
                        <td>{flower.quantity}</td>
                        <td>{flower.price * flower.quantity}</td>
                        <td
                          style={{
                            color: "var(--themeRed)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleRemove(i);
                          }}
                        >
                          x
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* summary */}
          <div className={css.cart}>
            <span>Cart</span>
            <div className={css.cartDetails}>
              <div>
                <span>Item</span>
                <span>{CartData.flowers.length}</span>
              </div>
              <div>
                <span>Total</span>
                <span>$ {total()}</span>
              </div>
            </div>
            {!order && CartData.flowers.length > 0 ? (
              <div className={css.buttons}>
                <button className="btn" onClick={handleOnDelivery}>
                  Pay on Delivery
                </button>
                <button className="btn" onClick={handleCheckout}>
                  Pay Now
                </button>
              </div>
           ) : (
              <span>Order in process</span>
            )} 
          </div>
        </div>
      )}
      <Toaster />
      {/* Modal */}
      <OrderModal
      opened = {paymentMethod === 0}
      setOpened = {setPaymentMethod}
      paymentMethod = {paymentMethod}
      />
    </Layout>
  );
};

export default Cart;
