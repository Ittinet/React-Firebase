import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from "@fortawesome/free-solid-svg-icons";

import set1 from './assets/images/FoodProduct/set1.png'
import set2 from './assets/images/FoodProduct/set2.png'
import set3 from './assets/images/FoodProduct/set3.png'
import food1 from './assets/images/FoodProduct/food1.png'
import food2 from './assets/images/FoodProduct/food2.png'
import { Star } from 'lucide-react';

const Shop = () => {
    const [toggleFavorite, settoggleFavorite] = useState(false)
    const handleFavorite = () => {
        settoggleFavorite(!toggleFavorite)
    }

    return (
        <div className="">
            <div className="mt-5 max-w-full m-auto">
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold">Menu</h1>
                </div>
                <div className="flex justify-center gap-16 mb-5">
                    <div >
                        Food
                    </div>
                    <div>
                        Drink
                    </div>
                    <div>
                        Iscream
                    </div>
                    <div>
                        bread
                    </div>
                </div>
                <div className="grid grid-cols-5 ">
                    <div className="py-5 px-2">
                        <div className="sticky top-0 overflow-y-auto h-[80vh] p-5 bg-red-100 rounded-2xl">
                            <div className="w-full flex flex-col gap-7">
                                <div className="flex gap-2 justify-center items-center">
                                    <span>Search:</span>
                                    <input className="w-full h-[30px] rounded-md" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3">

                        <div className="w-full p-5 container-grid ">
                            {
                                Array.from({ length: 12 }, (_, index) => (
                                    <div className="max-w-[300px] mx-auto bg-gray-100 p-3 rounded-2xl shadow-lg drop-shadow-lg relative" key={index}>
                                        <img className="test-shadow" src={food2} alt="" />
                                        <p className="text-xl font-bold text-center mt-2">Steak Wagil A5</p>
                                        <div className="flex mt-3"><FontAwesomeIcon className="text-yellow-500" icon={faStar} /><FontAwesomeIcon className="text-yellow-500" icon={faStar} /><FontAwesomeIcon className="text-yellow-500" icon={faStar} /><FontAwesomeIcon className="text-yellow-500" icon={faStar} /><FontAwesomeIcon className="text-yellow-500" icon={faStar} /></div>

                                        <div className="mt-2 flex justify-between">
                                            <span className="text-xl mt-2 text-orange-600 font-bold">$150.00</span>
                                            <button className="bg-red-200 px-2 rounded-xl">Add Cart</button>
                                        </div>
                                        <button className="h-5 w-10 bg-orange-500 rounded-md flex items-center justify-center p-2 absolute top-5 text-[12px] text-white">-50%</button>
                                        {
                                            toggleFavorite ? <FontAwesomeIcon onClick={handleFavorite} className="absolute top-5 right-3 size-6 text-yellow-500" icon={faBookmarkSolid} /> : <FontAwesomeIcon onClick={handleFavorite} className="absolute top-5 right-3 size-6" icon={faBookmarkRegular} />
                                        }

                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className="p-5">
                        <div className="bg-white w-full">
                            asd
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Shop