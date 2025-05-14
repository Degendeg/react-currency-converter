import { create } from "zustand"

const useCurrencyStore = create((set) => ({
    amount: null,
    from: "EUR",
    to: "SEK",
    rate: null,
    convertedAmount: 0,
    deductPercentage: 0.9,
    deductedAmount: 0,

    setAmount: (amt) => set({ amount: amt }),

    setDeductPercentage: (dperc) => set({ deductPercentage: dperc }),

    updateConvertedAmount: () =>
        set((state) => ({
            convertedAmount: (state.amount * state.rate).toFixed(2),
        })),

    deductConvertedAmount: () =>
        set((state) => ({
            deductedAmount: (state.convertedAmount * state.deductPercentage),
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