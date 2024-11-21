import React, { useState } from 'react';

const Login = () => {
    // จำลองข้อมูล 50 รายการ
    const allItems = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
    }));
    console.log(allItems)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // คำนวณข้อมูลที่จะแสดงในแต่ละหน้า

    const indexOfLastItem = currentPage * itemsPerPage; // อินเด็กซ์ของรายการสุดท้าย
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // อินเด็กซ์ของรายการแรก
    const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem); // ข้อมูลที่จะแสดงในหน้านี้

    const totalPages = Math.ceil(allItems.length / itemsPerPage); // จำนวนหน้าทั้งหมด

    // ฟังก์ชันสำหรับไปหน้าถัดไป
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // ฟังก์ชันสำหรับไปหน้าก่อนหน้า
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };



    return (
        <div>
            <h1>Pagination Example with Mock Data</h1>
            <ul>
                {currentItems.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>

            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Login;
