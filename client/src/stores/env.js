import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
    state: () => ({
        dialogs: {
            auth: {
                login: false,
                register: true,
            }
        }
    })
});