import { defineStore } from 'pinia'

interface UserState {
  isLoggedIn: boolean,
  userInfo: any
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        isLoggedIn: false,
        userInfo: null
    }),
    getters: {
        isLogin: (state) => state.isLoggedIn,
        name: (state) => state.userInfo.Nombre
    },
    
    actions: {
        loginStore(userInfo: any) {
            this.isLoggedIn = true
            this.userInfo = userInfo
        },
        logoutStore() {
            this.isLoggedIn = false
            this.userInfo = null
        },
    }
})