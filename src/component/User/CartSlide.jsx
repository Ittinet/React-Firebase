import { useEffect, useState } from "react"
import usefbStore from "../../store/store"
import { toast } from "react-toastify"
import { deleteProductOnCart, getTotalPrice, updateProcutOnCart } from "../../backend/UserApi"
import usedataStore from "../../store/datastore"
import { useNavigate } from 'react-router-dom';


const CartSlide = ({ onclose, isCartOpen }) => {
    const carts = usedataStore((state) => state.carts)
    const getCartUser = usedataStore((state) => state.getCartUser)
    const userid = usefbStore((state) => state.usercheck)
    const [totalprice, setTotalPrice] = useState(null)

    const navigate = useNavigate();


    useEffect(() => {
        handlegetTotalPrice()
    }, [totalprice, carts])

    useEffect(() => {
        if (userid) {
            const unsubscribe = getCartUser(userid)


            return () => {
                if (unsubscribe) {
                    unsubscribe(); // เรียก unsubscribe เพื่อลบการฟังข้อมูล
                    console.log('Unsubscribed from cart data');
                }
            };
        }
    }, [userid]);


    const handlegetTotalPrice = async () => {
        try {
            const res = await getTotalPrice(userid)
            if (res) {
                setTotalPrice(res.data.total_price)
            } else {
                return
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handledeleteProductOnCart = async (docid, userid) => {
        try {
            const res = await deleteProductOnCart(docid, userid)
            handlegetTotalPrice()
        } catch (error) {
            console.error(error)
        }

    }
    // console.log('carts', carts)

    const handleupdateProductOnCart = async (docdata, condition) => {
        try {
            const res = await updateProcutOnCart(docdata, condition, userid)
            handlegetTotalPrice()
            console.log(res.message)
        } catch (error) {
            console.log(error)
        }

    }
    // console.log('totalprice', totalprice)

    return (
        <div>
            <div className={`transition-all duration-700 fixed w-full h-full top-0 z-50 ${isCartOpen ? ' bg-gray-700 opacity-50' : 'opacity-0 pointer-events-none'}`}></div>


            <div className={`right-0 fixed bg-gray-100 h-[100vh] max-w-[450px] w-full z-[60] top-0 ${isCartOpen ? 'translate-x-[0]' : 'translate-x-full opacity-0 '} transition-all duration-500`}>
                <div className="w-full h-full relative">
                    <div className="flex justify-between bg-teal-600 text-white p-3 px-4 items-center">
                        <div className="">
                            <p className="text-xl font-bold ">Shopping Cart</p>
                        </div>
                        <div>
                            <button onClick={() => onclose()} className="text-2xl font-bold" >x</button>
                        </div>
                    </div>

                    <div className="p-3 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
                        {
                            carts && carts.length > 0 ? carts.map((item, index) =>
                                <div className="bg-white p-2 gap-2 flex relative" key={index}>
                                    <div className="max-w-[150px]">
                                        <img src={item.product_images[0]?.imageurl} alt="" />
                                    </div>

                                    <div className="w-full flex flex-col gap-2 mt-5 text-sm">
                                        <div className="flex justify-between w-full">
                                            <p>Name</p>
                                            <p>{item.product_name}</p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p>Color</p>
                                            <p>{item.product_color}</p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p>Total Price</p>
                                            <p>{item.total_price}</p>
                                        </div>
                                        <div className="flex justify-center mt-10">
                                            <button onClick={() => handleupdateProductOnCart(item, 'decrease')} className="w-5 bg-teal-500">-</button>
                                            <span className="w-8 text-center">{item.count}</span>
                                            <button onClick={() => handleupdateProductOnCart(item, 'increase')} className="w-5 bg-teal-500">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => handledeleteProductOnCart(item.docid, userid)} className="absolute right-2 top-0 text-red-500">x</button>
                                </div>
                            )
                                : <div className="mx-auto h-[100vh] flex justify-center items-center"><p className="text-2xl text-gray-300 font-bold">Not Product</p></div>
                        }

                    </div>
                    <div className="bg-white px-5 pb-5 pt-3 fixed bottom-5 w-full">
                        <p className="mb-2 w-full text-center text-gray-400">Have you fun to shopping!!</p>
                        <button onClick={() => navigate('/cart')} className="bg-teal-500 hover:bg-teal-600 text-white text-lg text-center w-full  p-2 z-[60] flex justify-center items-center gap-3 font-bold">
                            <p>ฺView Cart</p>
                            {carts && carts.length > 0 && <p className="">|</p>}
                            {carts && carts.length > 0 && <p>Total : {totalprice}$</p>}

                        </button>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default CartSlide