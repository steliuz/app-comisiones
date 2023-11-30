import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        barLoading: false,
        room_id: null,
    }),
    getters: {},
    actions: {
        userAuth(payload) {
            this.user = payload.user_data;
            this.barLoading = false;
        },
        handlebarLoading(status) {
            this.barLoading = status;
        },
        setRoom(id) {
            this.room_id = id;
        },
    },
    persist: true,
});