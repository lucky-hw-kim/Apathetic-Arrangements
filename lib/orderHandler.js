export const createOrder = async ({name, phone, address, etc, note, paymentMethod, status}) => {
  const res = await fetch('/api/order'), {
    method: "POST",
    body: JSON.stringify({
      
    })
  }
}