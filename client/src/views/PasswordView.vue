<template>
  <div class="container mx-auto">
    <div
      class="w-full bg-white text-black rounded border py-5 px-5 mt-5"
    >
      <div class="flex justify-between items-center">
        <h1 class="mb-5 text-2xl">Пароли</h1>
        <div class="flex gap-5">
          <button @click="handleRefresh" class="button">Опресняване</button>
          <button @click="handleOpenSaveDialog" class="button">
            Нова Парола
          </button>
        </div>
      </div>
      <div v-if="password.loading" class="mb-5 text-center">Зареждане...</div>
      <password-list-view />
      <save-password-view v-if="env.dialogs.passwords.savePassword" />
    </div>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";
import { usePasswordStore } from "@src/stores/password";

// views
import SavePasswordView from "@src/components/passwords/save-password/SavePasswordView.vue";
import PasswordListView from "@src/components/passwords/password-list/PasswordListView.vue";

export default {
  name: "PasswordView",
  components: {
    // views
    SavePasswordView,
    PasswordListView,
  },
  setup() {
    const env = useEnvStore();
    const password = usePasswordStore();

    const functions = {
      handleRefresh: () => {
        password.getItems();
      },
      handleOpenSaveDialog: () => {
        password.item = {};
        env.dialogs.passwords.savePassword = true;
      },
    };

    return { env, password, ...functions };
  },
};
</script>
