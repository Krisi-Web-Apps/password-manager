<template></template>

<script>
import api from '@src/boot/axios';
import { useEnvStore } from '@src/stores/env';
import { useUserStore } from '@src/stores/user';

export default {
  name: "InitialLogic",
  setup() {
    const user = useUserStore();
    const env = useEnvStore();

    const tryToLogin = () => {
        const token = localStorage.getItem("token");
        if (!token) {
          env.dialogs.auth.login = true;
          return;
        }
        user.setToken(token);
        user.getUser();
    }

    tryToLogin();
  }
};
</script>
