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
import { useEnvStore } from '@src/stores/env';
import { useUserStore } from '@src/stores/user';

export default {
  name: "LoggedOutItems",
  setup() {
    const user = useUserStore();
    const env = useEnvStore();
    const functions = {
      open: {
        openLoginDialog: () => {
          env.dialogs.auth.login = true;
        },
        openRegisterDialog: () => {
          env.dialogs.auth.register = true;
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
