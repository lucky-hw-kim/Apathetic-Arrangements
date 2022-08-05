import create from "zustand"

export const useStore = create (

  (set) => ({
    // cart
    cart : {
      flowers : []
    },

    // Add flower in the cart
    addFlower: (data) => 
    set((state) => ({
      cart : {
        flowers: [...state.cart.flowers, data]
      }
    })),

    // Remove flower 
    removeFlower : (index) => 
    set((state) => ({
      cart: {
        flowers : state.cart.flowers.filter((_, i) => i != index)
      }
    })),

    resetCart: () => 
    set(() => ({
      cart: {
        flowers: []
      }
    }))
  })
)