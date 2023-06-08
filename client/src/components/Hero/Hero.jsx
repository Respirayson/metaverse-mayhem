import React from 'react'

const Hero = (props) => {

    const { health, mana } = props.character;

    return (
        <div className='flex flex-col'>
            <div className='w-[150px] h-[40px] bg-red-700 rounded'>
                Health: { health }
            </div>
            <div className='w-[150px] h-[40px] bg-blue-700 rounded'>
                Mana: { mana }
            </div>
        </div>
        
    )
}

export default Hero