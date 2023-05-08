import { defineStore } from "pinia";

import api from "@src/boot/axios";
import { app } from "@src/main";
import { useEnvStore } from "./env";

export const usePasswordStore = defineStore("password", {
  state: () => ({
    loading: false,
    url: "/passwords",
    item: {
      title: "",
      desc: "",
      password: "",
    },
    items: [],
    suggestion: {
      length: 10,
      passwordText: "",
      permissions: {
        uppercaseLetters: true,
        lowercaseLetters: true,
        numbers: true,
        symbols: true,
      },
    },
  }),
  actions: {
    saveItem() {
      this.loading = true;
      api
        .post(`${this.url}`, this.item)
        .then((res) => {
          this.item = res.data;
          app.$toast.success("Паролата е запазена!");
          const env = useEnvStore();
          env.dialogs.passwords.savePassword = false;
          this.getItems();
        })
        .catch((err) => {
          if (err.message === "Title is required!") {
            app.$toast.error("Полето заглавие е задължително!");
          }
          if (err.message === "Title must be only letters.") {
            app.$toast.error(
              "Полето заглавие трябва да съдържа само главни, малки букви и интервали.",
              { duration: 10000 }
            );
          }
          if (err.message === "Title must be longer than 3 letters.") {
            app.$toast.error(
              "Полето заглавие трябва да съдържа повече от 3 букви.",
              { duration: 7000 }
            );
          }
          if (err.message === "Password is required!") {
            app.$toast.error("Полето парола е задължително!", {
              duration: 4000,
            });
          }
        })
        .finally(() => (this.loading = false));
    },
    getItems() {
      this.loading = true;
      api
        .get(`${this.url}/my`)
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
    },
    getItem() {
      this.loading = true;
      api
        .get(`${this.url}/my/${this.item.id}`)
        .then((res) => {
          this.item = res.data;
        })
        .catch((err) => {
          if (err.message === "Invalid id!") {
            app.$toast.error("Няма намерен запис с този идентификатор.");
          } else {
            app.$toast.error("Неприятана грешка!");
          }
        })
        .finally(() => (this.loading = false));
    },
    generatePassword() {
      // Define the character sets to use
      const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

      // Combine the character sets
      let allCharacters = "";

      if (this.suggestion.permissions.uppercaseLetters) allCharacters += uppercaseLetters;
      if (this.suggestion.permissions.lowercaseLetters) allCharacters += lowercaseLetters;
      if (this.suggestion.permissions.numbers) allCharacters += numbers;
      if (this.suggestion.permissions.symbols) allCharacters += symbols;

      if (
        !this.suggestion.permissions.uppercaseLetters &&
        !this.suggestion.permissions.lowercaseLetters &&
        !this.suggestion.permissions.numbers &&
        !this.suggestion.permissions.symbols
      ) {
        app.$toast.warning("Няма как да се генериран парола!");
        return;
      }

      // Generate the password
      let password = "";
      for (let i = 0; i < this.suggestion.length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
      }

      this.suggestion.passwordText = password;
    },
  },
});
