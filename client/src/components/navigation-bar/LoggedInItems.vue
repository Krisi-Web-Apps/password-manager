<template>
  <li>
    <button
      @click="() => handleClick({ func: 'openPasswordsDialog' })"
      class="button"
    >
      Пароли
    </button>
  </li>
  <li v-if="user.me.role_as === 'admin'">
    <button @click="() => handleClick({ func: 'openUsersDialog' })" class="button">
      Потребители
    </button>
  </li>
  <li>
    <button
      @click="() => handleClick({ func: 'openProfileDialog' })"
      class="button"
    >
      Здравей, {{ getFullname }}
    </button>
  </li>
  <li>
    <button @click="() => handleClick({ func: 'logout' })" class="button">
      Изход
    </button>
  </li>
</template>

<script>
// stores
import { useUserStore } from "@src/stores/user";

export default {
  name: "LoggedInItems",
  computed: {
    getFullname() {
      return `${this.user.me.first_name} ${this.user.me.last_name}`;
    },
  },
  setup() {
    const user = useUserStore();
    const functions = {
      open: {
        openPasswordsDialog: () => {
          // TODO:
          console.log("This is passwords dialog!");
        },
        openUsersDialog: () => {
          // TODO:
          console.log("This is users dialog!");
        },
        openProfileDialog: () => {
          // TODO:
          console.log("This is profile dialog!");
        },
        logout: () => {
          user.logout();
        },
      },
      handleClick: ({ func }) => {
        functions.open[func]();
      },
    };
    return { user, ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
