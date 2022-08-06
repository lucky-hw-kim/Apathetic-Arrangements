export const createOrder = async ({name, phone, address, etc, note, paymentMethod, status, total}) => {
  const res = await fetch('/api/order', {
    method: "POST",
    body: JSON.stringify({
      name: name,
      phone: phone,
      address: address,
      etc: etc,
      note: note,
      total: parseFloat(total),
      method: paymentMethod,
      status: 1
    })
  })
  const id = await res.json();
  return id
}