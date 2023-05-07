<template>
  <initial-logic />
  <div class="fixed top-0 left-0 mt-2 ml-2">
    Time: {{ env.time_ms.toFixed(0) }} ms.
  </div>
  <!-- login & register -->
  <login-view v-if="env.dialogs.auth.login" />
  <register-view v-if="env.dialogs.auth.register" />
  <div class="w-full h-screen flex flex-col justify-between">
    <div>
      <navigation-bar />
      <router-view></router-view>
    </div>
    <bottom-bar />
  </div>
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";

// views
import LoginView from "@src/components/auth/login/LoginView.vue";
import RegisterView from "@src/components/auth/register/RegisterView.vue";

// components
import InitialLogic from "@src/components/auth/initial-login/InitialLogic.vue";
import NavigationBar from "@src/components/navigation-bar/NavigationBar.vue";
import BottomBar from "@src/components/navigation-bar/BottomBar.vue";

export default {
  name: "AppView",
  components: {
    // views
    LoginView,
    RegisterView,

    // components
    InitialLogic,
    NavigationBar,
    BottomBar,
  },
  setup() {
    const env = useEnvStore();
    return { env };
  },
};
</script>
