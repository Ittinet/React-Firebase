import React, { useEffect, useState } from 'react'
import usefbStore from '../../../Store/store'
import { getAddress } from '../../../backend/UserApi'

const PlaceOrderPage = () => {
    const userid = usefbStore((state) => state.usercheck)
    const [addressData, setAddressData] = useState([])
    useEffect(() => {
        getAddressData()
    }, [])

    const getAddressData = async () => {
        try {
            const res = await getAddress(userid)
            setAddressData(res)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(addressData)
    return (
        <div>
            <div>
                <h1 className='text-xl font-bold'>DELIVERY METHOD</h1>
                <div className='border border-black border-2 mt-5 px-5 pt-4 pb-10 mb-10'>
                    <div className=''>
                        {
                            addressData && <div className='flex flex-col gap-2'>
                                <p className='text-md font-bold'>{addressData.firstname} {addressData.lastname}</p>
                                <p className='text-md'>{addressData.phone}</p>
                                <p className='text-md'>{addressData.address}</p>
                                <p className='text-md'>{addressData.province} {addressData.district} {addressData.subdistrict} {addressData.postcode}</p>
                            </div>
                        }
                    </div>
                </div>

                <div className='mb-10'>
                    <h1 className='text-xl font-bold'>Shipping Method</h1>
                    <ul className='list-disc text-[12px] text-gray-500 px-5 mt-4 space-y-2'>
                        <li>
                            Please understand that this website is only a website created for educational purposes. No intention of doing business
                        </li>
                        <li>
                            Please understand that if you place an order, this means testing the system only. You will not receive any products.
                        </li>
                    </ul>
                </div>

                <div>
                    <button className='w-full bg-teal-500 py-4 text-white font-bold text-xl'>PLACE ORDER</button>
                </div>

            </div>
        </div>
    )
}

export default PlaceOrderPage