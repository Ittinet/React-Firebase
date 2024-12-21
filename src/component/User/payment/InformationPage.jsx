import { useEffect, useState } from "react"
import usefbStore from "../../../Store/store"
import { addAddress, getAddress } from "../../../backend/UserApi"


const initializeState = {
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    subdistrict: '',
    postcode: '',

}
const InformationPage = ({ setPage }) => {
    const userid = usefbStore((state) => state.usercheck)

    const [form, setForm] = useState(initializeState)

    useEffect(() => {
        getAddressData()
    }, [])

    const getAddressData = async () => {
        try {
            const res = await getAddress(userid)
            if (res) {
                setForm(res)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmitForm = async (e) => {
        try {
            e.preventDefault()
            const res = await addAddress(form, userid)
            if (res.status === 'ok') {
                setPage('placeorder')
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(form)
    return (
        <div className="space-y-14">
            <form onSubmit={handlesubmitForm}>
                <div className="flex flex-col gap-3">
                    <div>
                        <h1 className="text-lg font-bold">CONTRACT INFORMATION</h1>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] text-gray-500" htmlFor="">First Name</label>
                        <input value={form.firstname} onChange={handleChange} name="firstname" className="border border-gray-300 w-full h-10 rounded-sm px-3" type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] text-gray-500" htmlFor="">Last Name</label>
                        <input value={form.lastname} onChange={handleChange} name="lastname" className="border border-gray-300 w-full h-10 rounded-sm px-3" type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] text-gray-500" htmlFor="">Phone Number</label>
                        <input value={form.phone} onChange={handleChange} name="phone" className="border border-gray-300 w-full h-10 rounded-sm px-3" type="text" />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div>
                        <h1 className="text-lg font-bold">SHIPPING ADDRESS</h1>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] text-gray-500" htmlFor="">Address Line</label>
                        <textarea value={form.address} onChange={handleChange} name="address" className="border border-gray-300 w-full h-24 rounded-sm px-2 py-2" type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] text-gray-500" htmlFor="">Province</label>
                        <input value={form.province} onChange={handleChange} name="province" className="border border-gray-300 w-full h-10 rounded-sm px-3" type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] text-gray-500" htmlFor="">District</label>
                        <input value={form.district} onChange={handleChange} name="district" className="border border-gray-300 w-full h-10 rounded-sm px-3" type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] text-gray-500" htmlFor="">SubDistrict</label>
                        <input value={form.subdistrict} onChange={handleChange} name="subdistrict" className="border border-gray-300 w-full h-10 rounded-sm px-3" type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] text-gray-500" htmlFor="">Post/Zip Code</label>
                        <input value={form.postcode} onChange={handleChange} name="postcode" className="border border-gray-300 w-full h-10 rounded-sm px-3" type="text" />
                    </div>
                </div>

                <div>
                    <button onClick={() => setPage('payment')} className="bg-teal-600 w-full text-white py-4">CONTINUE TO SHIPPING</button>
                </div>
            </form>
            <div>
                asdasd
            </div>


        </div>
    )
}

export default InformationPage