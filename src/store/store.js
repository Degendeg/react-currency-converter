import { create } from "zustand"

const useCurrencyStore = create((set) => ({
    amount: 0,
    from: "EUR",
    to: "SEK",
    rate: null,
    convertedAmount: 0,

    setAmount: (amt) => set({ amount: amt }),

    updateConvertedAmount: () =>
        set((state) => ({
            convertedAmount: (state.amount * state.rate).toFixed(2),
        })),

    fetchRate: async () => {
        try {
            const response = await fetch(import.meta.env.VITE_CURRENCY_URL)
            const data = await response.json()
            if (data.eur && data.eur.sek) {
                setTimeout(() => {
                    set({ rate: data.eur.sek })
                }, 1000)
            }
        } catch (error) {
            console.error("Failed to fetch exchange rate:", error)
        }
    }
}))

export default useCurrencyStore