import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        isLoggedIn: false,
        me: {
            first_name: "Кристиан",
            last_name: "Костадинов",
            role_as: "admin"
        }
    })
});
