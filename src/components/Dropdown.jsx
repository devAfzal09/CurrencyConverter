import React from 'react'
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const Dropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavourit,
    title = "",
}) => {

  const isFavorites = curr => favorites.includes(curr)

  return (
    <>
        <div>
        <label htmlFor={title} className='block text-sm font-medium text-zinc-700'>{title}</label>
        </div> 

        <div className='mt-1 relative'>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className='w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2'>

            {favorites.map((currency) => {
              return <option className='bg-zinc-400 text-white' value={currency} key={currency}>
                      {currency}
                    </option>
            })}
              <hr />
                {currencies
                .filter((c) => !favorites.includes(c))?.map((currency)=>{
                 return (
                    <option value={currency} key={currency}>
                      {currency}
                    </option>
                 );  
                })}
            </select>

            <button onClick={()=>handleFavourit(currency)} className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'>

              {isFavorites(currency) ? <HiStar/> : <HiOutlineStar />}

            </button>
        </div>
    </>
    
  )
}

export default Dropdown