import { useEffect, useState } from "react"
import { getCategory } from "../../backend/CategoryAPI"
import { createProduct, DeleteProduct, getProducts, readProduct } from "../../backend/ProductAPI"
import UploadFileProduct from "../../component/Admin/UploadFileProduct"
import { useNavigate, useParams } from "react-router-dom"

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

const EditProduct = () => {
    const [form, setForm] = useState(initialState)
    const [categoryData, setCategoryData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const unsubscriptCategory = getCategory((data) => {
            setCategoryData(data)
        })

        return () => {
            unsubscriptCategory()
        }
    }, [])

    useEffect(() => {
        getProduct()
    }, [])
    // console.log('form', form)
    const getProduct = async () => {
        const res = await readProduct(id)
        if (!res.paramCheck) {
            navigate(-1)
            return
        }
        setForm(res.ProductData[0])
        console.log(res)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = () => {
        createProduct(form)
            .then((res) => {
                console.log(res)
                setForm(initialState)
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
                    <select className="bg-gray-100 p-1" value={form.category_id} name="category_id" onChange={handleChange} id="">
                        <option className="" value=''>Please Select</option>
                        {
                            categoryData.map((item, index) =>
                                <option key={index} value={item.category_id}>{item.category_name}</option>
                            )
                        }
                    </select>
                    name <input className="bg-gray-100" onChange={handleChange} value={form.product_name} name="product_name" type="text" />
                    price <input className="bg-gray-100" onChange={handleChange} value={form.product_price} name="product_price" type="text" />
                    gender <input className="bg-gray-100" onChange={handleChange} value={form.product_gender} name="product_gender" type="text" />
                    size <input className="bg-gray-100" onChange={handleChange} value={form.product_size} name="product_size" type="text" />
                    <button onClick={handleSubmit} className="bg-yellow-400 mt-2">Edit</button>
                </div>

                <div className="flex flex-col">
                    color <input className="bg-gray-100" onChange={handleChange} value={form.product_color} name="product_color" type="text" />
                    description <input className="bg-gray-100" onChange={handleChange} value={form.product_description} name="product_description" type="text" />
                    stock <input className="bg-gray-100" onChange={handleChange} value={form.product_stock} name="product_stock" type="text" />
                    <UploadFileProduct form={form} setForm={setForm} />
                </div>

            </div>

            <hr className="mt-5 mb-5" />

        </div>
    )
}

export default EditProduct