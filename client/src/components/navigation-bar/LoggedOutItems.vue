<template>
  <li>
    <button @click="() => handleClick({ func: 'openLoginDialog' })" class="button">Вход</button>
  </li>
  <li>
    <button @click="() => handleClick({ func: 'openRegisterDialog' })" class="button">Регистрация</button>
  </li>
</template>

<script>
// stores
import { useUserStore } from '@src/stores/user';

export default {
  name: "LoggedOutItems",
  setup() {
    const user = useUserStore();
    const functions = {
      open: {
        openLoginDialog: () => {
          user.isLoggedIn = true;
          // TODO:
          console.log("This is login dialog!");
        },
        openRegisterDialog: () => {
          // TODO:
          console.log("This is register dialog!");
        },
      },
      handleClick: ({ func }) => {
        functions.open[func]();
      }
    }
    return { ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
