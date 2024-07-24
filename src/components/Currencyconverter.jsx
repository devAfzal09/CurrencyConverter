import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const Currencyconverter = () => {

    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState([])

    const [fromCurrency, setFormCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("INR")

    const [convertedAmount, setConvertedAmount] = useState(null)
    const [converting, setConverting] = useState(false)

    const [favorites, setfavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["INR","EUR"])

    // 'http://api.frankfurter.app/currencies'
    const fetchCurrencies   = async () => {
        try {
            const res = await fetch("http://api.frankfurter.app/currencies")
            const data = await res.json()
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.log("error fetching", error);
        }
    }

    useEffect(() => {
        
            fetchCurrencies();
        
    }, []); 

    console.log(currencies)


    // 'http://api.frankfurter.app/latest?amount=1&from=USD&to=INR'
    const converterCurrency = async () => {
        if(!amount)return
        setConverting(true);
        try {
            const res = await fetch(`http://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
            const data = await res.json()
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.log("error fetching", error);
        }finally{
            setConverting(false);
        }
    }

    const swapCurrencies = () => {
        setFormCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    const handleFavourit = (currency) => {
        let updateFavorites = [...favorites]

        if(favorites.includes(currency)){
            updateFavorites = updateFavorites.filter((fav) => fav !== currency);
        }else{
            updateFavorites.push(currency)
        }

        setfavorites(updateFavorites)
        localStorage.setItem("Favorites", JSON.stringify(updateFavorites))
    }

    
    return (
        <>
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-md shadow-md ">
            <h2 className="mb-5 font-semibold text-zinc-500">Currency Converter</h2>

            <div className="">
                <Dropdown favorites={favorites} currencies={currencies} title="From:" currency={fromCurrency} setCurrency={setFormCurrency} handleFavourit={handleFavourit}/ >
                {/* Swaping Currency button s */}
                <div className="flex justify-center my-5">
                    <button onClick={swapCurrencies} className="p-2 border-2 bg-zinc-300 rounded-md hover:bg-zinc-200">
                        <HiArrowsRightLeft className="text-xl" />
                    </button>
                </div>
                <Dropdown favorites={favorites} currencies={currencies} title="To:" currency={toCurrency} setCurrency={setToCurrency} handleFavourit={handleFavourit}/ >                
            </div>

            <div className="mt-4">
                <label htmlFor="amount" className="block text-sm text-zinc-600 font-medium">Amoutn:</label>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 mt-1" />
            </div>

            <div className="flex justify-end mt-5">
                <button onClick={converterCurrency} className={`px-5 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-500 focus:outline-none focus:ring-2 ${converting ? "animate-pulse" : ""}`}>Convert</button>
            </div>

            {convertedAmount && <div className="mt-4 text-lg font-medium text-right text-green-500">
                Convertd Amount: {convertedAmount}
            </div>}
        </div>
            
        </>
    )
}

export default Currencyconverter