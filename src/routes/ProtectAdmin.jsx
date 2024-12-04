import { useEffect, useState } from 'react'
import usefbStore from '../Store/store'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectAdmin = ({ element }) => {
    const [ok, setok] = useState(false)
    const usercheck = usefbStore((state) => state.usercheck)

    useEffect(() => {
        FetchData()
    }, [])

    const FetchData = async () => {
        try {
            const q = query(collection(db, 'users'), where('uid', '==', usercheck))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                return console.log('ไม่มี user นี้ในระบบ')
            }
            const data = querySnapshot.docs[0].data()
            if (data.role === 'admin') {
                setok(true)
            }
            console.log(ok)
            console.log(data)
        } catch (error) {
            setok(false)
            console.log('Error:', error.message)
        }
    }



    return (
        ok ? element : <LoadingToRedirect />
    )
}

export default ProtectAdmin