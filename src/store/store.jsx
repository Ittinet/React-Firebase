import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { authdb } from "../config/firebase";
import { signOut } from "firebase/auth";

const fbStore = (set, get) => ({
    user: null,
    unsubscribe: null,
    init: () => {
        const unsubscribe = authdb.onAuthStateChanged((user) => {
            if (user) {
                // ถ้ามีผู้ใช้ล็อคอิน
                set({
                    user: user
                }); // เก็บข้อมูลของผู้ใช้ที่ล็อคอินใน state
                console.log(user)
            } else {
                // ถ้าไม่มีผู้ใช้ล็อคอิน
                set({
                    user: null
                });
                console.log('no login')
            }
        })
        // เก็บ unsubscribe ไว้ใน store เพื่อใช้ในภายหลัง
        set({ unsubscribe });
    },
    stopListening: () => {
        const { unsubscribe } = get();
        if (unsubscribe) {
            unsubscribe();
            console.log('UnsubsribedFB')
        }
    },
    logout: async () => {
        try {
            await signOut(authdb)
        } catch (error) {
            console.log('Logout Failed', error.message)
        }
    }

})













const usePersist = {
    name: 'fb-store',
    storage: createJSONStorage(() => localStorage),
    partial: (state) => ({
        user: state.user
    })
}

const usefbStore = create(persist(fbStore, usePersist))

export default usefbStore
