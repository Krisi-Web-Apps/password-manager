<template>
  <initial-logic />
  <div class="fixed top-0 left-0 mt-2 ml-2">
    Time: {{ env.time_ms.toFixed(0) }} ms.
  </div>
  <navigation-bar />
  <!-- login & register -->
  <login-view v-if="env.dialogs.auth.login" />
  <register-view v-if="env.dialogs.auth.register" />
  <save-password-view v-if="env.dialogs.passwords.savePassword" />
  <password-list-view v-if="env.dialogs.passwords.passwordsList" />
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";

// views
import LoginView from "@src/components/auth/login/LoginView.vue";
import RegisterView from "@src/components/auth/register/RegisterView.vue";
import SavePasswordView from "@src/components/passwords/save-password/SavePasswordView.vue";
import PasswordListView from "@src/components/passwords/password-list/PasswordListView.vue";

// components
import InitialLogic from "@src/components/auth/initial-login/InitialLogic.vue";
import NavigationBar from "@src/components/navigation-bar/NavigationBar.vue";

export default {
  name: "AppView",
  components: {
    // views
    LoginView,
    RegisterView,
    SavePasswordView,
    PasswordListView,

    // components
    InitialLogic,
    NavigationBar,
  },
  setup() {
    const env = useEnvStore();
    return { env };
  },
};
</script>
