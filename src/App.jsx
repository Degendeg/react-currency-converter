import { useEffect } from "react"
import useCurrencyStore from "./store/store.js"
import './App.css'

function App() {
  const { amount, rate, from, to, setAmount, convertedAmount, updateConvertedAmount, fetchRate } = useCurrencyStore()

  useEffect(() => {
    updateConvertedAmount()
  }, [amount])

  useEffect(() => {
    fetchRate()
  }, [fetchRate])

  const handleValue = (e) => {
    const value = e.target.value.trim()
    const parsedValue = parseFloat(value)
    setAmount(value === "" ? "" : (parsedValue >= 0 ? parsedValue : 0))
  }

  return (
    <>
      {rate ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
          <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 wrapper mb-[20vh]">
            <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img src="https://img.borskollen.se/cms/2022/10/valuta_eur_sek.jpg" alt="card-image" />
            </div>
            <div class="pb-[5vh]">
              <h1 className="text-2xl text-black font-bold mb-4">Currency Converter</h1>
              <input
                autoFocus
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => handleValue(e)}
                className="p-2 border rounded text-black"
              />
              <p className="mt-4 text-xl text-black">
                {amount} {from} = <span className="font-bold">{convertedAmount} {to}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <div class="flex justify-center items-center space-x-1 text-xl text-gray-700">
            <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
              <path clip-rule='evenodd'
                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                fill='currentColor' fill-rule='evenodd' />
            </svg>
            <div>Loading ...</div>
          </div>
        </div>
      )}
    </>
  )
}

export default App