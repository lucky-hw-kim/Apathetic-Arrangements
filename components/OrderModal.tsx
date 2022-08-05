import Router, { useRouter } from "next/router"
import { Modal, ThemeIcon, useMantineTheme } from "@mantine/core"
import css from "../styles/OrderModal.module.css"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useState } from "react";
import { createRouteLoader } from "next/dist/client/route-loader";
import toast from "react-hot-toast";
import { useStore } from "../store/store";


const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const [formData, setFormData] = useState({})

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setFormData({ ...formData, [e.target.name]: e.target.value, "address": value})
  };

  const resetCart = useStore(state => state.resetCart);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // const id = await createOrder({ ...formData, total, paymentMethod })
    console.log(formData);
    toast.success("Order Placed")
    resetCart();
    {
      typeof window !== 'undefined' && localStorage.setItem('order', id)
    }
    Router.push(`order/${id}`)
    
  }

  const theme = useMantineTheme();
  const total = typeof window !== "undefined" && localStorage.getItem('total')

  // Address Auto complete

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });



  const handleSelect =
    ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          console.log("📍 Coordinates: ", { lat, lng });
        });
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input onChange={handleInput} type="text" name="name" required placeholder="Name"  />
        <input onChange={handleInput} type="text" name="phone" required placeholder="Phone Number"  />
        <input
            ref={ref}
            name="address"
            onChange={(e)=>{setValue(e.target.value)}}
            disabled={!ready}
            placeholder="Address"
            
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {status === "OK" && <ul>{renderSuggestions()}</ul>}
        <input onChange={handleInput} type="text" name="etc" placeholder="Apartment, suite, etc." />
        <textarea onChange={handleInput} name="note" placeholder="Special Note" />
        {paymentMethod===0 ? (
          <span>You will pay <span>${total}</span> on delivery.</span>
        ): <span>Paid order</span> }
        <button type="submit" className={`btn ${css.btn}`}>Place Order</button>
      </form>
    </Modal>
  )
}

export default OrderModal