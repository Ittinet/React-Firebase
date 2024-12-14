import { useEffect, useState } from 'react'
import usefbStore from '../Store/store'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectAdmin = ({ element }) => {
    const [ok, setok] = useState(null)
    const usercheck = usefbStore((state) => state.usercheck)

    useEffect(() => {
        const FetchData = async () => {
            try {
                const q = query(collection(db, 'users'), where('uid', '==', usercheck))
                const querySnapshot = await getDocs(q)
                if (querySnapshot.empty) {
                    setok(false)
                    console.log('ไม่มี user นี้ในระบบ')
                    return
                }
                const data = querySnapshot.docs[0].data()
                if (data.role === 'admin') {
                    setok(true)
                } else {
                    setok(false)
                }
                console.log(ok)
                console.log(data)
            } catch (error) {
                setok(false)
                console.log('Error:', error.message)
            }
        }
        FetchData()
    }, [usercheck])


    if (ok === null) {
        return (
            <div className='text-xl text-red-400 w-full p-3'>wait for security check......</div>
        )
    }


    return (
        ok ? element : <LoadingToRedirect />
    )
}

export default ProtectAdmin