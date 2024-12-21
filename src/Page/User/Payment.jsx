import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTotalPrice } from '../../backend/UserApi';
import usedataStore from '../../store/datastore';
import usefbStore from '../../Store/store';
import InformationPage from '../../component/User/payment/InformationPage';
import PlaceOrderPage from '../../component/User/payment/PlaceOrderPage';
import PaymentPage from '../../component/User/payment/PaymentPage';




const Payment = () => {

    const [totalprice, setTotalPrice] = useState(null)
    const [Page, setPage] = useState('information')

    const carts = usedataStore((state) => state.carts)
    const getCartUser = usedataStore((state) => state.getCartUser)
    const userid = usefbStore((state) => state.usercheck)


    // สร้าง state เพื่อเก็บ ID ของ setTimeout
    const [debounceTimer, setDebounceTimer] = useState(null);

    // ใช้ useEffect เพื่อให้ handlegetTotalPrice ถูกเรียกเมื่อ carts เปลี่ยนแปลง
    useEffect(() => {
        // หากมีการเรียก setTimeout อยู่แล้วให้เคลียร์ก่อน
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // ตั้ง setTimeout เพื่อหน่วงเวลา
        const timer = setTimeout(() => {
            handlegetTotalPrice();
        }, 500); // หน่วงเวลา 500ms

        // เก็บ ID ของ setTimeout เพื่อให้สามารถเคลียร์ได้ในครั้งถัดไป
        setDebounceTimer(timer);

        // เคลียร์ setTimeout เมื่อ component ถูก unmount หรือ carts เปลี่ยนแปลง
        return () => {
            clearTimeout(timer);
        };
    }, [carts]);




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



    console.log(totalprice)

    const handlegetTotalPrice = async () => {
        try {
            const res = await getTotalPrice(userid)
            if (res) {
                setTotalPrice(res.data.total_price)
            } else {
                setTotalPrice(0)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const PageRender = () => {
        switch (Page) {
            case 'information':
                return <InformationPage setPage={setPage} />
            case 'placeorder':
                return <PlaceOrderPage setPage={setPage} />
            case 'payment':
                return <PaymentPage setPage={setPage} />
        }
    }



    console.log(carts)

    return (
        <div className='w-full'>
            <h1 className="text-2xl font-bold">CHECKOUT</h1>
            <div className='flex w-full gap-10 relative'>

                <div className='w-[70%]'>
                    <div className='mt-5 text-gray-500 border-gray-300 border-b pb-3'>
                        <ul className="flex text-[12px] gap-2">
                            <li>Shopping Cart</li>
                            <ChevronRight size={15} />
                            <li onClick={() => setPage('information')} className={`${Page === 'information' && 'font-bold text-black'}`}>Information</li>
                            <ChevronRight size={15} />
                            <li onClick={() => setPage('placeorder')} className={`${Page === 'placeorder' && 'font-bold text-black'}`}>Place Order</li>
                            <ChevronRight size={15} />
                            <li onClick={() => setPage('payment')} className={`${Page === 'payment' && 'font-bold text-black'}`}>Payment</li>
                        </ul>
                    </div>

                    <div className='mt-10'>
                        {PageRender()}
                    </div>
                </div>

                <div className='w-2/3 w-[40%]'>
                    <div className='border border-black p-5'>
                        <h1 className='text-xl font-bold mb-5'>ORDER SUMMARY</h1>
                        <div className='flex gap-3 mb-10 flex-wrap w-[95%] mx-auto'>
                            {carts && carts.length > 0 && carts.map((item, index) =>
                                <div key={index} className='max-w-16 w-full flex-grow'>
                                    <img src={item.product_images[0].imageurl} alt="" />
                                </div>
                            )}
                        </div>
                        <div className='border-t-black border-t mt-5 py-4 flex justify-between '>
                            <p className='font-bold'>Price Total</p>
                            <p className='text-lg font-bold'>{totalprice} $</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment
