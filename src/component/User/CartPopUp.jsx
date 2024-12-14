import { useEffect } from "react";
import { addProductCart } from "../../backend/UserApi";
import usefbStore from "../../store/store";
import { toast } from "react-toastify";

const CartPopUp = (props) => {
    const userid = usefbStore((state) => state.usercheck)

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden'
        return () => {
            document.documentElement.style.overflowY = 'auto'
        }
    }, []);

    // console.log('product', props.product);

    const handleOuterClick = (e) => {
        if (e.target === e.currentTarget) {
            props.onclose();
        }
    };

    const handleImageZoom = (e) => {
        const img = e.target;  // รับตัวแปร img ซึ่งเป็นองค์ประกอบ <img> ที่เมาส์ชี้อยู่
        const { offsetX, offsetY } = e.nativeEvent; // ค่า offsetX, offsetY คือ ตำแหน่งของเมาส์ที่อยู่ในภาพ
        const { clientWidth, clientHeight } = img; // รับค่าความกว้างและความสูงของภาพ (ขนาดจริงของรูปภาพ)

        // คำนวณตำแหน่งที่เมาส์ชี้ในรูปภาพ
        const x = (offsetX / clientWidth) * 100; // คำนวณตำแหน่งแนวนอน (x) ของเมาส์ในภาพ (เป็นเปอร์เซ็นต์)
        const y = (offsetY / clientHeight) * 100; // คำนวณตำแหน่งแนวตั้ง (y) ของเมาส์ในภาพ (เป็นเปอร์เซ็นต์)

        // ปรับตำแหน่งของการขยายภาพ โดยให้จุดขยายอยู่ที่ตำแหน่งที่เมาส์ชี้
        img.style.transformOrigin = `${x}% ${y}%`; // กำหนดว่า จุดที่ขยายภาพจะอยู่ที่ไหน (ตำแหน่งที่เมาส์ชี้)
        img.style.transform = 'scale(2)'; // ขยายภาพให้มีขนาดเป็น 2 เท่า (หรือขนาดที่ต้องการ)

    };

    const handleImageLeave = (e) => {
        const img = e.target;  // รับตัวแปร img ซึ่งเป็นองค์ประกอบ <img> ที่เมาส์ออกจากภาพ
        img.style.transform = 'scale(1)';  // รีเซ็ตการขยายภาพกลับเป็นขนาดเดิม (scale 1 คือ ขนาดปกติ)
    };

    const handleAddToCart = async () => {
        try {
            const res = await addProductCart(props.product, userid)
            props.onclose()
            toast.success('เพิ่มสินค้าลงตระกร้าสำเร็จ!!')
            if (res) {
                toast.error(res.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    console.log(props.product)
    return (
        <div onClick={handleOuterClick} className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
            <div className="bg-white p-5 flex flex-col justify-center items-center gap-5 max-w-[400px] w-full sm:flex-row sm:max-w-[1000px] relative">
                <div className="max-w-[500px] w-full overflow-hidden">
                    <img
                        className="w-full transition-transform duration-200 ease-in-out"
                        src={props.product.product_images[0]?.imageurl}
                        alt=""
                        onMouseMove={handleImageZoom}
                        onMouseLeave={handleImageLeave}
                    />
                </div>
                <div className="flex flex-col gap-4 sm:gap-5 max-w-[500px] w-full sm:p-3 ">
                    <h1 className="text-2xl font-bold capitalize mb-3 border-b border-gray-200 pb-5">{props.product.product_name}</h1>
                    <div className="flex justify-between">
                        <p className="text-lg">Price </p>
                        <p className="text-xl font-bold text-teal-600">{props.product.product_price} $</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Size</p>
                        <p className="uppercase">{props.product.product_size}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Color</p>
                        <div className={`w-6 h-6 bg-${props.product.product_color}-300 rounded-full border border-gray-300`}></div>
                    </div>
                    <div className="flex justify-between">
                        <p>Type</p>
                        <p className="uppercase">{props.product.category_name}</p>
                    </div>
                    <div className="border-b border-gray-200 mt-2">
                    </div>
                    <div onClick={handleAddToCart} className="w-full bg-teal-600 py-1 mt-7 hover:scale-105 hover:cursor-pointer">
                        <button className="text-white px-2 flex mx-auto">Add To Cart</button>
                    </div>
                </div>
                <button onClick={handleOuterClick} className="absolute top-[-10px] right-[-2px] sm:top-0 sm:right-2 p-2 text-2xl font-bold text-gray-500 hover:scale-110 hover:text-black">x</button>
            </div>
        </div>
    );
};

export default CartPopUp;
