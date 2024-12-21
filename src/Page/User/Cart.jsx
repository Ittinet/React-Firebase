import { useEffect, useState } from 'react'
import usedataStore from '../../store/datastore'
import usefbStore from '../../store/store'
import { Trash2 } from 'lucide-react'
import { deleteProductOnCart, getTotalPrice } from '../../backend/UserApi'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const [CartData, setCartDate] = useState([])

  const carts = usedataStore((state) => state.carts)
  const getCartUser = usedataStore((state) => state.getCartUser)
  const userid = usefbStore((state) => state.usercheck)
  const [totalprice, setTotalPrice] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    handlegetTotalPrice()
  }, [carts, totalprice])

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

  const handleDeleteProductonCart = async (docid) => {
    try {
      const res = await deleteProductOnCart(docid, userid)
      handlegetTotalPrice()
    } catch (error) {
      console.error(error)
    }
  }

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



  console.log('cart', carts)
  console.log('totalprice', totalprice)

  return (
    <div className='w-full border-b-black border-b min-h-[600px]'>
      <div>
        <h1 className='text-2xl font-bold'>SHOPPING CART</h1>
      </div>
      <div className='flex mt-5 w-full gap-10'>
        {/* left */}
        <div className='w-full'>
          <div className='flex justify-between border-gray-300 border-b border-t pt-1 pb-3 px-1'>
            <p className='text-gray-500 text-sm'>Product</p>
            <p className='text-gray-500 text-sm'>Price</p>
          </div>

          {
            carts && carts.length > 0 ? carts.map((item, index) => (
              <div key={index} className='px-1 py-3 flex justify-between w-full'>

                <div className='flex gap-5 w-[60%]'>
                  <div className='max-w-[130px]'>
                    <img src={item.product_images[0]?.imageurl} alt={item.product_name} />
                  </div>
                  <div className='py-5 uppercase flex flex-col gap-2 text-[13px] font-bold'>
                    <p>{item.product_name}</p>
                    {item.product_size && <p>SIZE: {item.product_size}</p>}
                    <p>COLOR: {item.product_color}</p>
                    <p>Amount: {item.count}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteProductonCart(item.docid)} className='w-7 h-7 border border-gray-400 rounded-full flex items-center justify-center p-1.5 hover:bg-gray-200 duration-75'>
                  <Trash2 size={15} />
                </button>


                <div className=''>
                  {item.product_price} $
                </div>
              </div>
            )) : <div className='w-full text-center mt-20'>No items Found </div>
          }
        </div>

        {/* right */}
        {
          (carts && carts.length > 0 && totalprice) && <div className='border border-black w-2/3 p-5 max-h-[260px]'>
            <h1 className='text-xl font-bold'>ORDER SUMMARY</h1>
            <div className='border-t-black border-t mt-5 py-4 flex justify-between '>
              <p className='font-bold'>Price Total</p>
              <p className='text-lg font-bold'>${totalprice && totalprice.toFixed(2)}</p>
            </div>
            <button onClick={() => navigate('/payment')} className='bg-teal-500 hover:bg-teal-700 text-white w-full py-2 mt-10'>CHECKOUT</button>
            <p className='text-[10px] text-gray-500 w-full text-center mt-2'>Shipping fees & taxes (if any) are calculated on the checkout page.</p>
          </div>
        }

      </div>
    </div>
  )
}

export default Cart
