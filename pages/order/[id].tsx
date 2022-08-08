import { useEffect } from "react";
import Layout from "../../components/Layout";
import { client } from "../../lib/client";
import css from '../../styles/OrderId.module.css'
import { UilBill, UilFlower, UilTruck, UilGift } from '@iconscout/react-unicons'
import Spinner from "../../assets/Spinner.svg"
import Image from "next/image";

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`;
  const order = await client.fetch(query);
  return {
    props: {
      order: order[0],
    },
  };
};

export default function Orders({ order }) {
  useEffect(()=>{
    if(order.status > 3){
      localStorage.clear();
    }
  })
  return (
    <Layout>
      <div className={css.container}>
        <span className={css.heading}>Order in Process</span>
        <div className={css.details}>
          <div>
            <span>Customer Name</span>
            <span>{order.name}</span>
          </div>
          <div>
            <span>Phone</span>
            <span>{order.phone}</span>
          </div>
          <div>
            <span>Method</span>
            <span>
              {order.method === 0 ? "Cash on Delivery" : "Online Payment(Paid)"}
            </span>
          </div>
          <div>
            <span>Total</span>
            <span>${order.total}</span>
          </div>
        </div>
        <div className={css.statusContainer}>
          <div className={css.status}>
            <UilBill width={50} height={50}/>
            <span>Payment</span>
            {order.method === 0 ? 
            <span className={css.pending}>On Delivery</span> :
            <span className={css.completed}>Completed</span> 
          }
          </div>
           <div className={css.status}>
            <UilFlower width={50} height={50}/>
            <span>Arranging</span>
            {order.status === 1 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt=""/>
              </div>
            )}
            {order.status > 1 && (
              <span className={css.completed}>Completed</span> 
            )}
          </div>
          <div className={css.status}>
            <UilTruck width={50} height={50}/>
            <span>Enroute</span>
            {order.status === 2 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt=""/>
              </div>
            )}
             {order.status > 2 && (
              <span className={css.completed}>Completed</span>
            )}
          </div>
          <div className={css.status}>
            <UilGift width={50} height={50}/>
            <span>Delivered</span>
            {order.status === 3 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt=""/>
              </div>
            )}
             {order.status > 3 && (
              <span className={css.completed}>Completed</span>
            )}
          </div> 
        </div>
      </div>
    </Layout>
  );
}
