<template>
  <div class="container mx-auto">
    <div class="w-full max-h-[660px] bg-white text-black rounded border py-5 px-5 mt-5 overflow-y-scroll">
      <h1 class="mb-5 text-2xl">Пароли</h1>
      <password-list-view />
      <save-password-view v-if="env.dialogs.passwords.savePassword" />
    </div>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";

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
    return { env };
  },
};
</script>
