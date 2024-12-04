import { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { deleteFiles, uploadFiles } from '../../backend/CategoryAPI'

const UploadFile = ({ form, setForm }) => {
    const [isLoading, setIsLoading] = useState(false)
    console.log('formimage', form)
    const handleOnChange = (e) => {
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = [...form.images];
            for (let i = 0; i < files.length; i++) {
                console.log(files)

                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error('กรุณาใช้ไฟล์รูปภาพ')
                    continue
                }
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "PNG",
                    100,
                    0,
                    (data) => {
                        uploadFiles(data)
                            .then((res) => {
                                console.log('response', res)
                                allFiles.push(res)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                            })
                            .catch((error) => {
                                console.log(error)
                            })


                    },
                    "file"
                )
            }
        }


    }

    const handleDelete = async (fileref) => {
        try {
            const images = form.images
            const res = await deleteFiles(fileref)
            const filterImages = images.filter((item) => {
                return item.fileref != fileref
            })
            setForm({
                ...form,
                images: filterImages
            })
            console.log('filter', filterImages)
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <input onChange={handleOnChange} type="file" name='images' multiple />
            {
                form.images.map((item, index) =>
                    <div key={index} className='w-32 h-32 relative'>
                        <img className='w-full h-full' src={item.imageurl} alt="" />
                        <button onClick={() => handleDelete(item.fileref)} className='absolute top-0 right-0 bg-red-400 px-1 rounded-sm text-sm'>x</button>
                    </div>
                )
            }

        </div>
    )
}

export default UploadFile