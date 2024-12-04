import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

import { ShoppingCart } from 'lucide-react';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Star } from 'lucide-react';

import category1 from './assets/productimg/category-1.jpg'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config/firebase";
import usefbStore from "./Store/store";

const Shop = () => {
   

    const [toggleFavorite, settoggleFavorite] = useState(false)
    const handleFavorite = () => {
        settoggleFavorite(!toggleFavorite)
    }
    

    return (
        <>
            <div className="mt-5 max-w-full m-auto relative">

                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold">Menu</h1>
                </div>
                <div className="flex justify-center gap-16 mb-5">
                    <div>
                        Shirt
                    </div>
                    <div>
                        Hat
                    </div>
                    <div>
                        Shoes
                    </div>
                    <div>
                        Bag
                    </div>
                </div>

                <div className="flex w-full justify-center">

                    <div className="w-[1400px] flex justify-center px-3">
                        <div className="max-w-[1400px]  flex-grow">
                            <div className="container-grid-shop">
                                {
                                    Array.from({ length: 20 }).map((item, index) =>
                                        <div key={index} className='bg-white max-w-[350px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                            <div className='relative'>
                                                <img className="w-full object-cover rounded-2xl" src={category1} alt="" />
                                                <div className='bg-red-300 text-white px-2 py-1 w-10 absolute top-2 left-2 rounded-full'>
                                                    <p className='text-[10px] text-center'>Hot</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 px-1 relative">
                                                <p className="text-[10px] text-gray-600 mb-2">Clothing</p>
                                                <h1 className="text-[16px] font-extrabold mb-2">Colorful Pattern Shirts</h1>
                                                <div className="flex mb-3"><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /></div>
                                                <div className="flex gap-3 items-center"><p className="font-bold text-teal-700">$238</p><p><s className="text-[13px] font-bold text-gray-400">$250</s></p></div>
                                                <button className='absolute right-3 bottom-2 bg-emerald-50 border  rounded-full p-2.5'><ShoppingCart size={20} /></button>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </div>

                <div className="absolute border border-gray-200 bg-white w-[250px] h-[500px] left-0 top-[102px] rounded-lg py-4 px-3">
                    <div className="mb-6">
                        <p className="font-bold">Sex :</p>
                        <div className="flex gap-4 mt-2">
                            <p className="border border-black px-2 rounded-md">ชาย</p>
                            <p className="border border-black px-2 rounded-md">หญิง</p>
                        </div>
                    </div>
                    <div className="">
                        <p className="mb-2 font-bold">Size :</p>
                        <div className="flex gap-3">
                            <button className="border border-black px-2 text-md rounded-md">S</button>
                            <button className="border border-black px-2 text-md rounded-md">M</button>
                            <button className="border border-black px-2 text-md rounded-md">L</button>
                            <button className="border border-black px-2 text-md rounded-md">XL</button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="mb-2 font-bold">Color :</p>
                        <div className="flex gap-12">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2"><button className="bg-green-500 border w-6 h-6 rounded-full"></button><span className="text-sm">Green</span></div>
                                <div className="flex items-center gap-2"><button className="bg-blue-500 border w-6 h-6 rounded-full"></button><span className="text-sm">Blue</span></div>
                                <div className="flex items-center gap-2"><button className="bg-red-500 border w-6 h-6 rounded-full"></button><span className="text-sm">Red</span></div>
                                <div className="flex items-center gap-2"><button className="bg-pink-500 border w-6 h-6 rounded-full"></button><span className="text-sm">Pink</span></div>
                                <div className="flex items-center gap-2"><button className="bg-yellow-400 border w-6 h-6 rounded-full"></button><span className="text-sm">Yellow</span></div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2"><button className="bg-black border w-6 h-6 rounded-full"></button><span className="text-sm">Black</span></div>
                                <div className="flex items-center gap-2"><button className="bg-yellow-800 border w-6 h-6 rounded-full"></button><span className="text-sm">Brown</span></div>
                                <div className="flex items-center gap-2"><button className="bg-purple-500 border w-6 h-6 rounded-full"></button><span className="text-sm">Purple</span></div>
                                <div className="flex items-center gap-2"><button className="bg-white border w-6 h-6 rounded-full"></button><span className="text-sm">White</span></div>
                                <div className="flex items-center gap-2"><button className="bg-orange-200 border w-6 h-6 rounded-full"></button><span className="text-sm">Beige</span></div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Shop