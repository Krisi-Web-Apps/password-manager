<template>
  <div class="container mx-auto">
    <div class="bg-gray-50 rounded shadow mt-5 p-2">
      <ul class="hidden md:flex justify-center gap-2">
        <logged-in-items v-if="user.isLoggedIn" />
        <logged-out-items v-if="!user.isLoggedIn" />
      </ul>
      <div class="md:hidden flex justify-end py-5 px-5">
        <button class="button" @click="handleOpen">Menu</button>
        <div
          class="fixed z-40 top-0 right-0 w-1/2 h-screen text-black bg-white shadow-md border transition-transform"
          :class="getPosition"
        >
          <div class="flex justify-end p-2">
            <button class="button" @click="handleClose">Затвори</button>
          </div>
          <ul class="flex flex-col gap-2 px-2">
            <logged-in-items v-if="user.isLoggedIn" :classNames="`block`" />
            <logged-out-items v-if="!user.isLoggedIn" :classNames="`block`" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// stores
import { useUserStore } from "@src/stores/user";
import { useEnvStore } from "@src/stores/env";

// components
import LoggedInItems from "@src/components/navigation-bar/LoggedInItems.vue";
import LoggedOutItems from "@src/components/navigation-bar/LoggedOutItems.vue";

export default {
  name: "NavigationBar",
  components: {
    // components
    LoggedInItems,
    LoggedOutItems,
  },
  computed: {
    getPosition() {
      return !this.env.dialogs.global.navbars.top ? "translate-x-full" : "";
    },
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const functions = {
      handleOpen: () => {
        env.dialogs.global.navbars.top = true;
      },
      handleClose: () => {
        env.dialogs.global.navbars.top = false;
      },
    };

    return { env, user, ...functions };
  },
};
</script>
