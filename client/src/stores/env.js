import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
  state: () => ({
    time_ms: 0.0,
    dialogs: {
      global: {
        confimDialog: false,
        navbars: {
          top: false,
          bottom: false,
        }
      },
      auth: {
        login: false,
        register: false,
      },
      passwords: {
        savePassword: false,
        passwordsList: false,
        generatePassword: false,
      },
    },
  }),
});
