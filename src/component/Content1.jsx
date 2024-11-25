import { useState } from 'react';
import new1 from "../assets/img1/new/1.jpg"
import new2 from "../assets/img1/new/4.jpg"
import new3 from "../assets/img1/new/5.jpg"


const Content1 = () => {

    return (
        <div className="flex justify-center">
            <div className='mt-6 max-w-[1600px] flex justify-center items-center w-full'>
                <div className='flex w-full gap-5'>
                    <div className='max-w-[40rem] max-h-[30rem]'><img className='w-full h-full object-cover' src={new2} alt="" /></div>
                    <div className='max-w-[40rem] w-full max-h-[30rem]'> <img className='w-full h-full object-cover' src={new1} alt="" /></div >
                    <div className='max-w-[40rem] max-h-[30rem]'><img className='w-full h-full object-cover' src={new3} alt="" /></div>
                </div >
            </div >
        </div >
    );
};

export default Content1



