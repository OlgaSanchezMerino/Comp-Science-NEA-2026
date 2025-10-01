// Utilities
import type { User } from '@/types/models/user'
import { defineStore } from 'pinia'
import { ref, computed } from "vue";


export const useUserStore = defineStore('user', function () {
    //Create an object with the basic information of the user, that is stored in the userStore
    const user = ref({
        "_id": "68408ff70fa7ba7414dcb363",
        username: "username_1",
        password: "12345"

    })

    async function login() {
        const response = await fetch("http://localhost:5000/user/" + user.value._id)
        const data = await response.json()
        user.value = data
    }

    async function refreshFavGenres() {
        const response = await fetch("http://localhost:5000/user/" + user.value._id)
        const data = await response.json()
        user.value.favGenres = data.favGenres
    }

    return {
        user,
        login,
        refreshFavGenres,
        
    };
})
