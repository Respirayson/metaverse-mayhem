import React from 'react'

const Collectible = ({ name, description, mana, attack, defense }) => {
  return (
    <div className='sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer'>
        <img src='https://images.unsplash.com/photo-1621574539436-4b7b0b0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0dGxlJTIwY2FyZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' 
        className='h-[158px] w-full object-cover rounded-[15px]' />

        <div className='flex flex-col p-4'>
            <div className='block'>
                <h3 className='font-semibold text-white text-[16px] text-left leading-[26px] truncate'>{name}</h3>
                <p className='mt-[5px] font-normal text-[#808191] text-left leading-[18px] truncate'>{description}.</p>
            </div>

            <div className='flex flex-wrap justify-between gap-2 mt-[15px]'>
                <div className='flex flex-col'>
                    <h4 className='font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>Mana: {mana}</h4>
                    <h4 className='font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>Attack: {attack}</h4>
                    <h4 className='font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>Defense: {defense}</h4>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Collectible