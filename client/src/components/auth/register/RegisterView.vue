<template>
  <simple-dialog @close="handleClose">
    <template v-slot:header>Register</template>
    <template v-slot:body>
      <div class="px-5">
        Body
      </div>
    </template>
  </simple-dialog>
</template>

<script>
// stores
import { useUserStore } from "@src/stores/user";
import { useEnvStore } from "@src/stores/env";

// dialogs
import SimpleDialog from "@src/components/dialogs/SimpleDialog.vue";

export default {
  name: "RegisterView",
  components: {
    // dialogs
    SimpleDialog,
  },
  setup() {
    const user = useUserStore();
    const env = useEnvStore();
    const functions = {
      handleClose: () => {
        env.dialogs.auth.register = false;
      }
    }
    return { user, ...functions }
  }
};
</script>

<style lang="scss" scoped></style>
