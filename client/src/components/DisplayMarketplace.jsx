import React from 'react'
import { Listing } from '.'

const DisplayMarketplace = () => {
  return (
    <div>
        <h1 className='font-semibold text-white text-left text-[18px]'>All Listings &#40;3&#41;</h1>

        <div className='flex flex-wrap mt-[20px] gap-[26px]'>
            <Listing
                name="The Red Dragon"
                description="A dragon that is red."
                seller="0x1234567890"
                price="0.055 ETH"
                minion="Minion"
             />
             <Listing
                name="The Blue Dragon"
                description="A dragon that is blue."
                seller="0x1234567890"
                price="0.005 ETH"
                minion="Minion"
             />
             <Listing
                name="The Green Dragon"
                description="A dragon that is green."
                seller="0x1234567890"
                price="0.0023 ETH"
                minion="Minion"
             />
        </div>
    </div>
  )
}

export default DisplayMarketplace