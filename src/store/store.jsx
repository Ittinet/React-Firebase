import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { authdb, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore";

const fbStore = (set, get) => ({
    usercheck: null,
    user: null,
    unsubscribe: null,
    signin: async (email, password) => {
        const Sigin = await signInWithEmailAndPassword(authdb, email, password)
        const usersignin = Sigin.user
        set({
            usercheck: usersignin.uid
        })
        console.log('user in zustand', usersignin)
        return usersignin

    },
    signup: async (email, password) => {
        const signup = await createUserWithEmailAndPassword(authdb, email, password)
        const usersignup = signup.user
        set({
            usercheck: usersignup.uid
        })
        const userRef = doc(db, "users", usersignup.uid);
        await setDoc(userRef, {
            uid: usersignup.uid,
            email: usersignup.email,
            role: 'user',
            username: '',
            phone: '',
            fullname: '',
            address: '',
            carts: [],
            orders: [],
            picture: [],
            activate: 'true',
            createAt: serverTimestamp()
        });
        console.log('user in zustand', usersignup)
        return usersignup


    },
    init: () => {
        const unsubscribe = authdb.onAuthStateChanged(async (user) => {
            if (user) {
                // ถ้ามีผู้ใช้ล็อคอิน
                set({
                    user: user,
                    usercheck: user.uid
                }); // เก็บข้อมูลของผู้ใช้ที่ล็อคอินใน state
                console.log(user)
            } else {
                // ถ้าไม่มีผู้ใช้ล็อคอิน
                set({
                    user: null,
                    usercheck: null
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
            set({
                usercheck: null,
                user: null,
                unsubscribe: null,
            })
        } catch (error) {
            console.log('Logout Failed', error.message)
        }
    },


})







const usePersist = {
    name: 'fb-store',
    storage: createJSONStorage(() => localStorage),
    // partial: (state) => ({
    //     user: state.user,
    //     usercheck: state.usercheck,
    // })
}

const usefbStore = create(persist(fbStore, usePersist))

export default usefbStore
