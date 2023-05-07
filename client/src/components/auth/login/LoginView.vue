<template>
  <simple-dialog @close="handleClose" class="z-40">
    <template v-slot:header>Login</template>
    <template v-slot:body>
      <form @submit.prevent="handleLogin" class="px-5">
        <p v-if="user.error" class="mb-5 text-red-500 text-center">
          {{ user.error }}
        </p>
        <div class="mb-5">
          <label for="email">Имейл Адрес</label>
          <input
            type="email"
            placeholder="Вашия имейл адрес..."
            id="email"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="user.credentials.email"
            :disabled="user.loading"
          />
        </div>
        <div class="mb-5">
          <label for="user_password">Парола</label>
          <input
            type="password"
            placeholder="Вашата парола..."
            id="user_password"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="user.credentials.password"
            :disabled="user.loading"
          />
        </div>
        <button type="submit" class="button" :disabled="user.loading">
          Вход в системата
        </button>
        <div class="mt-5">
          <button @click="handleOpenRegister" class="px-2 rounded">
            Още нямате профил?
          </button>
        </div>
      </form>
    </template>
  </simple-dialog>
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";
import { useUserStore } from "@src/stores/user";

// dialogs
import SimpleDialog from "@src/components/dialogs/SimpleDialog.vue";

export default {
  name: "LoginView",
  components: {
    // dialogs
    SimpleDialog,
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();
    const functions = {
      handleLogin: () => {
        user.login();
      },
      handleOpenRegister: () => {
        env.dialogs.auth.register = true;
        env.dialogs.auth.login = false;
      },
      handleClose: () => {
        env.dialogs.auth.login = false;
      },
    };
    return { user, ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
