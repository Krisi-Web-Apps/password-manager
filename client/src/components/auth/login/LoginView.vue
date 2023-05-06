<template>
  <simple-dialog  @close="handleClose">
    <template v-slot:header>Login</template>
    <template v-slot:body>
      <form class="px-5">
        Body
      </form>
    </template>
  </simple-dialog>
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";

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
    const functions = {
      handleClose: () => {
        env.dialogs.auth.login = false;
      }
    }
    return { ...functions }
  }
};
</script>

<style lang="scss" scoped></style>
