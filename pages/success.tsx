import Layout from "../components/Layout"
import OrderModal from "../components/OrderModal"


const success = () => {
  return (
    <Layout>
      <OrderModal opened={true} paymentMethod={1} setOpened={""}/>
    </Layout>
  )
}

export default success