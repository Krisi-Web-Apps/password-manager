<template>
  <simple-dialog @close="handleClose">
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
          />
        </div>
        <div class="mb-5">
          <label for="password">Парола</label>
          <input
            type="password"
            placeholder="Вашата парола..."
            id="password"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="user.credentials.password"
          />
        </div>
        <button type="submit" class="button">Вход в системата</button>
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
      handleClose: () => {
        env.dialogs.auth.login = false;
      },
    };
    return { user, ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
