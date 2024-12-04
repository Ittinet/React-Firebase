import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Content1 = () => {

    return (
        <div className="mt-20 mb-20">

            <div className='w-full mx-auto'>
                <div className='gird-content-1 w-full justify-between px-2'>

                    <div className='bg-gray-100  flex flex-col gap-4 items-center justify-center text-center py-8 rounded-2xl'>
                        <div className='w-full flex items-center justify-center'>
                            <div className='relative w-[130px] h-[130px] rounded-full z-10 bg-blue-800 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faCarSide} className='text-[60px] z-20  absolute text-white' />
                                <div className='absolute w-10 h-10 bg-blue-800 rounded-md bottom-[-11px] rotate-45'></div>
                            </div>

                        </div>
                        <h1 className='font-bold text-[18px] mt-7'>Free Shipping</h1>
                        <p className='text-sm '>Lorem ipsum dolor sit amet consectetur</p>
                    </div>

                    <div className='bg-gray-100  flex flex-col gap-4 items-center justify-center text-center py-8 rounded-2xl'>
                        <div className='w-full flex items-center justify-center'>
                            <div className='relative w-[130px] h-[130px] rounded-full z-10 bg-blue-800 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faCarSide} className='text-[60px] z-20  absolute text-white' />
                                <div className='absolute w-10 h-10 bg-blue-800 rounded-md bottom-[-11px] rotate-45'></div>
                            </div>

                        </div>
                        <h1 className='font-bold text-[18px] mt-7'>Free Shipping</h1>
                        <p className='text-sm '>Lorem ipsum dolor sit amet consectetur</p>
                    </div><div className='bg-gray-100  flex flex-col gap-4 items-center justify-center text-center py-8 rounded-2xl'>
                        <div className='w-full flex items-center justify-center'>
                            <div className='relative w-[130px] h-[130px] rounded-full z-10 bg-blue-800 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faCarSide} className='text-[60px] z-20  absolute text-white' />
                                <div className='absolute w-10 h-10 bg-blue-800 rounded-md bottom-[-11px] rotate-45'></div>
                            </div>

                        </div>
                        <h1 className='font-bold text-[18px] mt-7'>Free Shipping</h1>
                        <p className='text-sm '>Lorem ipsum dolor sit amet consectetur</p>
                    </div><div className='bg-gray-100  flex flex-col gap-4 items-center justify-center text-center py-8 rounded-2xl'>
                        <div className='w-full flex items-center justify-center'>
                            <div className='relative w-[130px] h-[130px] rounded-full z-10 bg-blue-800 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faCarSide} className='text-[60px] z-20  absolute text-white' />
                                <div className='absolute w-10 h-10 bg-blue-800 rounded-md bottom-[-11px] rotate-45'></div>
                            </div>

                        </div>
                        <h1 className='font-bold text-[18px] mt-7'>Free Shipping</h1>
                        <p className='text-sm '>Lorem ipsum dolor sit amet consectetur</p>
                    </div>


                </div>
            </div>
        </div >
    );
};

export default Content1



