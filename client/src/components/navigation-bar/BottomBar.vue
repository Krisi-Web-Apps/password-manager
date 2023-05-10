<template>
  <div class="bg-white text-black border shadow mt-5">
    <div class="container mx-auto">
      <ul class="md:flex hidden gap-2 my-5">
        <li>
          <router-link to="/" class="button bg-gray-300 border-gray-400">
            Начало
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="button bg-gray-300 border-gray-400">
            За Сайта
          </router-link>
        </li>
      </ul>
      <div class="md:hidden flex justify-end py-5 px-5">
        <button class="button" @click="handleOpen">Menu</button>
        <div
          class="fixed top-0 right-0 w-1/2 h-screen text-black bg-white shadow-md border transition-transform"
          :class="getPosition"
        >
          <div class="flex justify-end p-2">
            <button class="button" @click="handleClose">Затвори</button>
          </div>
          <ul class="flex flex-col gap-2 px-2">
            <li>
              <router-link
                to="/"
                class="button block bg-gray-200 border-gray-400"
              >
                Начало
              </router-link>
            </li>
            <li>
              <router-link
                to="/about"
                class="button block bg-gray-200 border-gray-400"
              >
                За Сайта
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";

export default {
  name: "BottomBar",
  computed: {
    getPosition() {
      return !this.env.dialogs.global.navbars.bottom ? "translate-x-full" : "";
    },
  },
  setup() {
    const env = useEnvStore();

    const functions = {
      handleOpen: () => {
        env.dialogs.global.navbars.bottom = true;
      },
      handleClose: () => {
        env.dialogs.global.navbars.bottom = false;
      },
    };

    return { env, ...functions };
  },
};
</script>
