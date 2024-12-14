import { useState } from 'react'
import { toast } from 'react-toastify'
import Resizer from 'react-image-file-resizer'
import { deleteFileProduct, uploadFileProduct } from '../../backend/ProductAPI'

const UploadFileProduct = ({ form, setForm }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteShowImages = async (data) => {
        try {
            const images = form.product_images
            await deleteFileProduct(data)
            const filterImages = images.filter((item) => {
                return data.fileref != item.fileref
            })
            setForm({
                ...form,
                product_images: filterImages
            })
        } catch (error) {
            console.error(error)
        }

    }

    const handleChange = async (e) => {
        const files = e.target.files

        if (files) {
            setIsLoading(true)
            let allFiles = [...form.product_images]
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`ไฟล์ ${files[i].name} ไม่ใช่รูปภาพ`)
                    continue
                }
                Resizer.imageFileResizer(
                    file,
                    1080,
                    1080,
                    "PNG",
                    100,
                    0,
                    (fileData) => {
                        uploadFileProduct(fileData)
                            .then((res) => {
                                console.log('responseUploadFile', res)
                                allFiles.push(res)
                                setForm({
                                    ...form,
                                    product_images: allFiles
                                })
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })
                        console.log(fileData)
                        console.log('form', form)
                    },
                    "file"
                );
            }
        }
    }

    return (
        <div className='flex flex-col mt-3'>
            <span>Image</span>
            <input onChange={handleChange} className="bg-gray-100" name="product_images" type="file" multiple />
            <div className='flex gap-3 mt-2'>
                {
                    form.product_images.map((item, index) =>
                        <div key={index} className='max-w-[200px] max-h-[200px] relative '>
                            <img className='w-full h-full' src={item.imageurl} alt="" />
                            <button onClick={() => handleDeleteShowImages(item)} className='absolute top-0 right-0 bg-red-400 px-1 text-sm'>x</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UploadFileProduct