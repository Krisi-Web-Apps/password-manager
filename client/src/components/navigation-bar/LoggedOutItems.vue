<template>
  <li :class="props.classNames">
    <button
      @click="() => handleClick({ func: 'openLoginDialog' })"
      class="w-full button"
    >
      Вход
    </button>
  </li>
  <li :class="props.classNames">
    <button
      @click="() => handleClick({ func: 'openRegisterDialog' })"
      class="w-full button"
    >
      Регистрация
    </button>
  </li>
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";

export default {
  name: "LoggedOutItems",
  props: {
    classNames: String,
  },
  setup(props) {
    const env = useEnvStore();

    const functions = {
      open: {
        openLoginDialog: () => {
          env.dialogs.auth.login = true;
          env.dialogs.global.navbars.top = false;
        },
        openRegisterDialog: () => {
          env.dialogs.auth.register = true;
          env.dialogs.global.navbars.top = false;
        },
      },
      handleClick: ({ func }) => {
        functions.open[func]();
      },
    };
    
    return { ...functions, props };
  },
};
</script>
