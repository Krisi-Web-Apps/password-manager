<template>
  <navigation-bar />
  <!-- login & register -->
  <login-view v-if="env.dialogs.auth.login" />
  <register-view v-if="env.dialogs.auth.register" />
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";

// dialogs
import LoginView from "@src/components/auth/login/LoginView.vue";
import RegisterView from "@src/components/auth/register/RegisterView.vue";

// components
import NavigationBar from "@src/components/navigation-bar/NavigationBar.vue";

export default {
  name: "AppView",
  components: {
    // views
    LoginView,
    RegisterView,

    // components
    NavigationBar,
  },
  setup() {
    const env = useEnvStore();
    return { env }
  }
};
</script>
