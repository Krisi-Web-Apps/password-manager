import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
    state: () => ({
        time_ms: 0.00,
        dialogs: {
            auth: {
                login: false,
                register: false,
            },
            passwords: {
                savePassword: false,
                passwordsList: false,
                generatePassword: false,
            }
        }
    })
});
