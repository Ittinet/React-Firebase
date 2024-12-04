import { useEffect, useState } from "react"
import { createCategory, DeleteCategory, deleteFiles, getCategory } from "../../backend/CategoryAPI"
import { Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import UploadFile from "../../component/Admin/UploadFile";

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
            console.log('data', item)
        });
        console.log(form)
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

    const removeCategory = async (item) => {
        try {
            await DeleteCategory(item.docid)
            await deleteFiles(item.images[0].fileref)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="bg-white w-full p-5">
            <div className="flex gap-5">
                <input name="name" onChange={handleChange} onKeyDown={handleKeyPress} value={form.name} className="bg-blue-100" type="text" />
                <UploadFile form={form} setForm={setForm} />
            </div>
            <button onClick={addCategory} className="bg-green-400 p-2 mt-5">Add</button>
            <hr className="mt-5" />
            <ul className="mt-5">
                {
                    data.map((item, index) =>
                        <div key={index} className="flex justify-between  items-center  mb-3 border-b py-3" >
                            <div className="max-w-[100px]"><img src={item.images[0]?.imageurl} alt="" /></div>
                            <li >{item.name}</li>
                            <button onClick={() => removeCategory(item)} className="text-sm bg-red-400 p-1 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                    )
                }
            </ul>
        </div >
    )
}

export default Category