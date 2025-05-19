import { useEffect } from "react"
import useCurrencyStore from "./store/store.js"
import './App.css'

function App() {
  const {
    amount,
    rate,
    from,
    to,
    setAmount,
    setDeductPercentage,
    convertedAmount,
    updateConvertedAmount,
    deductPercentage,
    deductedAmount,
    deductConvertedAmount,
    fetchRate
  } = useCurrencyStore()

  useEffect(() => {
    updateConvertedAmount()
  }, [amount])

  useEffect(() => {
    fetchRate()
  }, [fetchRate])

  useEffect(() => {
    deductConvertedAmount()
  }, [convertedAmount, deductPercentage])

  const handleAmountValue = (e) => {
    const value = e.target.value.trim()
    const parsedValue = parseFloat(value)
    setAmount(value === "" ? "" : (parsedValue >= 0 ? parsedValue : 0))
  }

  const handlePercValue = (e) => {
    const value = e.target.value.trim()
    const parsedValue = parseFloat(value)
    setDeductPercentage(value === "" ? "" : (parsedValue >= 0 ? parsedValue : 0))
  }

  const handleKeyDown = (e) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (!isMobile) {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "Tab") {
        e.preventDefault()
      }
    }
  }

  return (
    <>
      {rate ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
          <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 wrapper">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img src="https://img.borskollen.se/cms/2022/10/valuta_eur_sek.jpg" alt="card-image" />
            </div>
            <div className="pb-[5vh]">
              <h1 className="text-2xl text-black font-bold mb-4">Currency Converter</h1>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={amount}
                placeholder="€ EUR"
                onChange={(e) => handleAmountValue(e)}
                className="p-2 border rounded text-black text-center text-xl no-spin"
              />
              <p className="mt-4 text-xl text-black">
                {amount} {from} = <span className="font-bold">{convertedAmount} {to}</span>
              </p>
            </div>
          </div>
          {convertedAmount != 0 && (
            <div className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-96 p-4 wrapper">
              <div className="relative m-2.5 overflow-hidden text-white rounded-md">
                <img src="https://aff.org.uk/wp-content/uploads/2020/04/Calculator-banner.jpg" alt="card-image" />
              </div>
              <h1 className="text-2xl text-black font-bold mb-4">Deducted amount</h1>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={deductPercentage}
                onChange={(e) => handlePercValue(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                className="p-2 border rounded text-black text-center text-xl"
              />
              <p className="mt-4 text-xl text-black">
                {Math.round(deductPercentage * 10000) / 100}% = <span className="font-bold">{deductedAmount.toFixed(2)} {to}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="flex justify-center items-center space-x-1 text-xl text-gray-700">
            <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
              <path clipRule='evenodd'
                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                fill='currentColor' fillRule='evenodd' />
            </svg>
            <div>Loading ...</div>
          </div>
        </div>
      )}
    </>
  )
}

export default App