import { useRouter } from "next/router";
import { Modal, useMantineTheme } from "@mantine/core";
import css from "../styles/OrderModal.module.css";
import useOnclickOutside from "react-cool-onclickoutside";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "../store/store";
import { createOrder } from "../lib/orderHandler";

const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const total = typeof window !== "undefined" && localStorage.getItem("total");
  const [formData, setFormData] = useState({});
  const handleInput = (e) => {
    // Update the keyword of the input element
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetCart = useStore((state) => state.resetCart);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...formData, total, paymentMethod });
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== "undefined" &&
        typeof window !== "undefined" &&
        localStorage.setItem("order", id);
    }
    router.push(`order/${id}`);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
        />
        <input
          onChange={handleInput}
          type="text"
          name="address"
          required
          placeholder="Address"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
        <input
          onChange={handleInput}
          type="text"
          name="etc"
          placeholder="Apartment, suite, etc."
        />
        <textarea
          onChange={handleInput}
          name="note"
          placeholder="Special Note"
        />
        {paymentMethod === 0 ? (
          <span>
            You will pay <span>${total}</span> on delivery.
          </span>
        ) : (
          <span>Paid order</span>
        )}
        <button type="submit" className={`btn ${css.btn}`}>
          Place Order
        </button>
      </form>
    </Modal>
  );
};

export default OrderModal;
