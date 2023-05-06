import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
    state: () => ({
        time_ms: 0.00,
        dialogs: {
            auth: {
                login: true,
                register: false,
            }
        }
    })
});
