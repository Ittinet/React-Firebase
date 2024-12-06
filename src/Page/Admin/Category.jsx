import { useEffect, useState } from "react"
import { createCategory, DeleteCategory, getCategory } from "../../backend/CategoryAPI"
import { Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import UploadFileCategory from "../../component/Admin/UploadFileCategory";

const initialState = {
    name: '',
    images: []
}

const Category = () => {
    const [form, setForm] = useState(initialState)
    const [data, setData] = useState([])

    useEffect(() => {
        const unsubscribe = getCategory((item) => {
            setData(item)
        });
        return () => unsubscribe();
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addCategory = async () => {
        try {
            if (form.name.length <= 0) {
                return toast.warn('กรุณาใส่ข้อมูล')
            }
            const create = await createCategory(form)
            setForm(initialState)
            console.log(create)
        } catch (error) {
            toast.error('Something Wrong!')
            console.log(error)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addCategory();
        }
    }

    const removeCategory = async (data) => {
        try {
            await DeleteCategory(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="bg-white w-full p-5">
            <div className="flex gap-5">
                <input name="name" onChange={handleChange} onKeyDown={handleKeyPress} value={form.name} className="bg-blue-100" type="text" />
                <UploadFileCategory form={form} setForm={setForm} />
            </div>
            <button onClick={addCategory} className="bg-green-400 p-2 mt-5">Add</button>
            <hr className="mt-5" />
            <ul className="mt-5">
                {
                    data.map((item, index) =>
                        <div key={index} className="flex justify-between  items-center  mb-3 border-b py-3" >
                            <p>{item.category_id}</p>
                            <div className="max-w-[100px]"><img src={item.category_images[0]?.imageurl} alt="" /></div>
                            <li >{item.category_name}</li>
                            <button onClick={() => removeCategory(item)} className="text-sm bg-red-400 p-1 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                    )
                }
            </ul>
        </div >
    )
}

export default Category