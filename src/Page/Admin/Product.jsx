import { useEffect, useState } from "react"
import { getCategory } from "../../backend/CategoryAPI"
import { createProduct, DeleteProduct, getProducts } from "../../backend/ProductAPI"
import UploadFileProduct from "../../component/Admin/UploadFileProduct"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const initialState = {
    category_id: '',
    category_name: '',
    product_name: '',
    product_price: '',
    product_gender: '',
    product_size: '',
    product_color: '',
    product_description: '',
    product_stock: '',
    product_images: []
}

const Product = () => {
    const [form, setForm] = useState(initialState)
    const [categoryData, setCategoryData] = useState([])
    const [productData, setProductData] = useState([])


    useEffect(() => {
        const unsubscribeProducts = getProducts((data) => {
            setProductData(data)
        })

        const unsubscriptCategory = getCategory((data) => {
            setCategoryData(data)
        })

        return () => {
            unsubscriptCategory()
            unsubscribeProducts()
        }
    }, [])
    // console.log(productData)
    // console.log('form', form)
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log('update', form)
    }

    const handleSubmit = () => {
        if (!form.category_id) {
            return toast.error('กรุณาเลือกหมวดหมู่')
        }
        if (!form.product_name) {
            return toast.error('กรุณาใส่ชื่อสินค้า')
        }
        createProduct(form)
            .then((res) => {
                console.log(res)
                setForm({ ...initialState, category_id: '' });
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleDelete = async (data) => {
        try {
            await DeleteProduct(data)
        } catch (error) {
            console.error(error)
        }

    }
    // console.log(form)


    return (
        <div className="bg-white w-full p-5">
            <div className="flex gap-20">
                <div className="flex flex-col gap-2">
                    <span>Category</span>
                    <select className="bg-gray-100 p-1" name="category_id" value={form.category_id} required onChange={handleChange} id="">
                        <option className="" value='' disabled>Please Select</option>
                        {
                            categoryData.map((item, index) =>
                                <option key={index} value={item.category_id}>{item.category_name}</option>
                            )
                        }
                    </select>
                    name <input className="bg-gray-100" onChange={handleChange} value={form.product_name} name="product_name" type="text" />
                    price <input className="bg-gray-100" onChange={handleChange} value={form.product_price} name="product_price" type="number" />
                    <span>gender</span>
                    <select value={form.product_gender} required name="product_gender" onChange={handleChange} id="">
                        <option value="" disabled>Please Select</option>
                        <option value="male">Male</option>
                        <option value="female">FeMale</option>
                        <option value="both">Both</option>
                    </select>
                    size <input className="bg-gray-100" onChange={handleChange} value={form.product_size} name="product_size" type="text" />
                    <button onClick={handleSubmit} className="bg-green-400 mt-2">Add</button>
                </div>

                <div className="flex flex-col">
                    color <input className="bg-gray-100" onChange={handleChange} value={form.product_color} name="product_color" type="text" />
                    description <input className="bg-gray-100" onChange={handleChange} value={form.product_description} name="product_description" type="text" />
                    stock <input className="bg-gray-100" onChange={handleChange} value={form.product_stock} name="product_stock" type="number" />
                    <UploadFileProduct form={form} setForm={setForm} />
                </div>

            </div>

            <hr className="mt-5 mb-5" />

            <div className="flex flex-col gap-7">
                {
                    productData.map((item, index) =>
                        <div key={index}>
                            <ul className="flex gap-20 items-center justify-between px-5">
                                <li key={index} className="flex flex-col gap-3">
                                    {
                                        item.product_images.map((item, index) =>

                                            <div key={index} className="max-w-[100px]">
                                                <img src={item.imageurl} alt="" />
                                            </div>

                                        )
                                    }
                                </li>
                                <li>{item.category_name}</li>
                                <li>{item.product_name}</li>
                                <div>
                                    <button onClick={() => handleDelete(item)} className="bg-red-400 px-2 text-sm">x</button>
                                    <Link to={'/admin/product/' + item.product_id}><button className="text-[10px] bg-yellow-300 p-1 ml-2">Edit</button></Link>
                                </div>
                            </ul>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Product