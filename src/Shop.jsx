import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShoppingCart } from 'lucide-react';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { filterProduct, getProducts } from "./backend/ProductAPI";
import { getCategory } from "./backend/CategoryAPI";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import CartPopUp from "./component/User/CartPopUp";

const Shop = () => {
    const [productData, setProductData] = useState([])
    const [toggleFavorite, settoggleFavorite] = useState(false)
    const [categoryData, setCategoryData] = useState([])

    const [isOpenPopUp, setisOpenPopUp] = useState(false)
    const [productSelectOnCart, setProductSelectOnCart] = useState(null)

    const [genders, setGenders] = useState([]);
    const [size, setSize] = useState([])
    const [searchtext, setSearchText] = useState('')
    const [searchcategories, setSearchCategories] = useState('')
    const [searchColor, setSearchColor] = useState([])
    const [price, setPrice] = useState([0, 5000])


    const handleFavorite = () => {
        settoggleFavorite(!toggleFavorite)
    }

    const handleCheckGender = async (e) => {
        const gender = e.target.value; // ค่าที่ได้จาก checkbox
        // ตรวจสอบว่า checkbox ที่เลือกอยู่ใน state หรือไม่
        if (e.target.checked) {
            // ถ้า checkbox ถูกติ๊ก ให้เพิ่มค่าไปใน array
            setGenders((prev) => [...prev, gender]);
        } else {
            // ถ้า checkbox ถูกยกเลิกติ๊ก ให้ลบค่าออกจาก array
            setGenders((prev) => prev.filter((item) => item !== gender));
        }
    };

    const handleCheckSize = async (e) => {
        const size = e.target.value;
        if (e.target.checked) {
            setSize((prev) => [...prev, size])
        } else {
            setSize((prev) => prev.filter((item) => item !== size))
        }
    }

    const handleCheckWord = async (e) => {
        setSearchText(e.target.value)
    }
    // console.log(searchtext)
    // console.log(genders)
    // console.log('size', size)
    // console.log('checkcategory', searchcategories)
    // console.log('searchcolor', searchColor)
    const handleCheckCategory = (e) => {
        const data = e.target.getAttribute('data-value')


        if (searchcategories === data) {
            setSearchCategories('');
        } else {
            setSearchCategories(data)
        }
    }

    const handleCheckColor = (e) => {
        const data = e.target.getAttribute('data-color')
        setSearchColor((prev) => {
            if (prev.includes(data)) {
                return prev.filter((color) => color !== data)
            } else {
                return [...prev, data]
            }
        })

    }

    const handlePrice = (value) => {
        setPrice(value)
    }

    const handleOpenPopupCart = (product) => {
        setisOpenPopUp(true)
        setProductSelectOnCart(product)
    }

    const handleClosePopupCart = () => {
        setisOpenPopUp(false)
    }



    useEffect(() => {
        let unsubscribeProduct
        const fetchProducts = async () => {
            if (genders.length > 0 || size.length > 0 || searchtext.length > 0 || searchColor.length > 0 || (searchcategories && searchcategories !== 'all') || price.length === 2) {
                const res = await filterProduct({ genders, size, searchtext, searchcategories, searchColor, price });
                setProductData(res)
            } else {
                unsubscribeProduct = getProducts((data) => {
                    setProductData(data)
                })
            }
        }

        fetchProducts();
        return () => {
            if (typeof unsubscribeProduct === 'function') {
                unsubscribeProduct()
            }
        };
    }, [genders, size, searchtext, searchcategories, searchColor, price])

    // console.log('product', productData)

    useEffect(() => {
        const unsubscribeCategory = getCategory((data) => {
            setCategoryData(data)
        })

        return () => {
            unsubscribeCategory()
        }
    }, [])

    // console.log(categoryData)
    return (
        <>
            <div className="mt-5 max-w-full m-auto relative">

                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold">Menu</h1>
                </div>
                <div className="flex justify-center gap-16 mb-5">
                    <div>
                        <span className={`cursor-pointer ${searchcategories === 'all' ? 'bg-red-300' : ''}`} onClick={handleCheckCategory} data-value="all">All</span>
                    </div>
                    <div>
                        <span className={`cursor-pointer ${searchcategories === 'hat' ? 'bg-red-300' : ''}`} onClick={handleCheckCategory} data-value="hat">Hat</span>
                    </div>
                    <div>
                        <span className={`cursor-pointer ${searchcategories === 'clothes' ? 'bg-red-300' : ''}`} onClick={handleCheckCategory} data-value="clothes">Clothes</span>
                    </div>
                    <div>
                        <span className={`cursor-pointer ${searchcategories === 'bag' ? 'bg-red-300' : ''}`} onClick={handleCheckCategory} data-value="bag">Bag</span>
                    </div>
                    <div>
                        <span className={`cursor-pointer ${searchcategories === 'shoes' ? 'bg-red-300' : ''}`} onClick={handleCheckCategory} data-value="shoes">Shoes</span>
                    </div>
                </div>

                <div className="flex w-full justify-center">

                    <div className="w-[1400px] flex justify-center px-3">
                        <div className="max-w-[1400px]  flex-grow">
                            <div className="container-grid-shop">
                                {
                                    productData?.map((item, index) =>
                                        <div key={index} className='bg-white max-w-[350px] w-full mx-auto p-3 border border-gray-200 rounded-2xl group shadow drop-shadow-lg'>
                                            <div className='relative overflow-hidden'>
                                                <img className="w-full object-cover rounded-2xl group-hover:scale-110" src={item.product_images[0]?.imageurl} alt="" />
                                                <div className='bg-red-300 text-white px-2 py-1 w-10 absolute top-2 left-2 rounded-full'>
                                                    <p className='text-[10px] text-center'>Hot</p>
                                                </div>
                                                {
                                                    item.product_size.length > 0
                                                        ? <span className={`${item.product_size === 's' ? 'bg-pink-300'
                                                            : item.product_size === 'm' ? 'bg-red-300'
                                                                : item.product_size === 'l' ? 'bg-blue-300'
                                                                    : 'bg-purple-300'
                                                            } uppercase text-white text-[10px] px-1.5 rounded-md py-0.5 absolute right-2 bottom-2`}>{item.product_size}</span>
                                                        : <div></div>
                                                }

                                            </div>
                                            <div className="mt-4 px-1 relative">
                                                <p className="text-[10px] text-gray-600 mb-2">{item.category_name}</p>
                                                <h1 className="text-[16px] font-extrabold ">{item.product_name}</h1>

                                                <div className="flex mb-3 mt-2"><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /></div>
                                                <div className="flex gap-3 items-center"><p className="font-bold text-teal-700">${item.product_price}</p><p><s className="text-[13px] font-bold text-gray-400">$250</s></p></div>
                                                <button onClick={() => handleOpenPopupCart(item)} className='absolute hover:scale-110 hover:bg-emerald-200 right-3 bottom-2 bg-emerald-50 border  rounded-full p-2.5'><ShoppingCart size={20} /></button>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </div>

                <div className="absolute border border-gray-200 bg-white w-[250px] left-0 top-[102px] rounded-lg py-4 px-2.5 shadow drop-shadow-md">
                    <div className="mb-6">
                        <div className="mb-5">
                            <label htmlFor="searchtext">Search:</label>
                            <input onChange={handleCheckWord} type="text" id="searchtext" className="bg-gray-200 w-full rounded-md border border-gray-300 px-2 text-md" placeholder="Search...." />
                        </div>

                        <p className="font-bold">Sex :</p>
                        <div className="flex gap-1 mt-2 flex-col">
                            <div className="flex gap-3 items-center">
                                <input value='male' onChange={handleCheckGender} type="checkbox" id="male" />
                                <label htmlFor="male" >Male</label>
                            </div>
                            <div className="flex gap-3 items-center">
                                <input value='female' onChange={handleCheckGender} type="checkbox" id="female" />
                                <label htmlFor="female">Female</label>
                            </div>
                            <div className="flex gap-3 items-center">
                                <input value='both' onChange={handleCheckGender} type="checkbox" id="both" />
                                <label htmlFor="both">Both</label>
                            </div>

                        </div>
                    </div>
                    <div className="">
                        <span className="mb-2 font-bold">Size :</span>
                        <div className="flex gap-3">
                            <input onChange={handleCheckSize} type="checkbox" id="s" value='s' />
                            <label htmlFor="s">S</label>
                        </div>
                        <div className="flex gap-3">
                            <input onChange={handleCheckSize} type="checkbox" id="m" value='m' />
                            <label htmlFor="m">M</label>
                        </div>
                        <div className="flex gap-3">
                            <input onChange={handleCheckSize} type="checkbox" id="l" value='l' />
                            <label htmlFor="l">L</label>
                        </div>
                        <div className="flex gap-3">
                            <input onChange={handleCheckSize} type="checkbox" id="xl" value='xl' />
                            <label htmlFor="xl">XL</label>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="mb-2 font-bold">Color :</p>
                        <div className="">
                            <div className="flex gap-3 flex-wrap">
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('yellow') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='yellow' className={`bg-yellow-300 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('orange') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='orange' className={`bg-orange-400 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('red') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='red' className={`bg-red-500 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('black') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='black' className={`bg-black border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('gray') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='gray' className={`bg-gray-400 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('white') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='white' className={`bg-white border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('pink') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='pink' className={`bg-pink-300 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('purple') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='purple' className={`bg-purple-400 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('blue') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='blue' className={`bg-blue-400 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('green') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='green' className={`bg-green-400 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('brown') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='brown' className={`bg-yellow-700 border w-7 h-7 rounded-full`}></button></div>
                                <div className={`flex items-center gap-2 p-0.5 border rounded-full ${searchColor.includes('beige') ? 'border-black' : 'border-white'}`}><button onClick={handleCheckColor} data-color='beige' className={`bg-orange-200 border w-7 h-7 rounded-full`}></button></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-7">
                        <h1>ค้นหาราคา</h1>
                        <div>
                            <div className="flex justify-between">
                                <span>Min: {price[0]}</span>
                                <span>Max: {price[1]}</span>
                            </div>
                            <Slider
                                onChange={handlePrice}
                                range
                                min={0}
                                max={5000}
                                defaultValue={[0, 5000]}
                            />
                        </div>
                    </div>
                </div>
                {isOpenPopUp && <CartPopUp onclose={handleClosePopupCart} product={productSelectOnCart} />}

            </div>
        </>
    )
}

export default Shop