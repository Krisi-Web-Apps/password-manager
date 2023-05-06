<template>
  <div class="pt-5">
    <h1 class="text-4xl text-center">Мениджър на пароли</h1>
  </div>
  <div class="container mx-auto">
    <div class="bg-gray-50 rounded shadow mt-5 p-2">
      <ul class="flex justify-center gap-2">
        <logged-in-items v-if="user.isLoggedIn" />
        <logged-out-items v-if="!user.isLoggedIn" />
      </ul>
    </div>
  </div>
</template>

<script>
// stores
import { useUserStore } from "@src/stores/user";

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
  setup() {
    const user = useUserStore();
    const handleClick = () => {};
    return { user, handleClick };
  },
};
</script>
