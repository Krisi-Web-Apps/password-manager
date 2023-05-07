<template>
  <simple-dialog @close="handleClose">
    <template v-slot:header>{{ getHeader }}</template>
    <template v-slot:body>
      <form @submit.prevent="handleSubmit" class="px-5">
        <div class="mb-5">
          <label for="title">Заглавие *</label>
          <input
            type="text"
            placeholder="Въведете някакво заглавие..."
            id="title"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="password.item.title"
            :disabled="password.loading"
          />
        </div>
        <div class="mb-5">
          <label for="desc">Описание</label>
          <input
            type="text"
            placeholder="Въведете някакво описание..."
            id="desc"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="password.item.desc"
            :disabled="password.loading"
          />
        </div>
        <div class="mb-5">
          <label for="password">Парола *</label>
          <input
            type="text"
            placeholder="Въведете новата парола..."
            id="password"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="password.item.password"
            :disabled="password.loading"
          />
        </div>
        <p class="mb-5">Полетата със звездичка са задължителни!</p>
        <button type="submit" class="button" :disabled="password.loading">
          Запазване на паролата
        </button>
      </form>
    </template>
  </simple-dialog>
</template>

<script>
// stores
import { usePasswordStore } from "@src/stores/password";

// dialogs
import SimpleDialog from "@src/components/dialogs/SimpleDialog.vue";
import { useEnvStore } from "@src/stores/env";

export default {
  name: "SavePasswordView",
  components: {
    // dialogs
    SimpleDialog,
  },
  computed: {
    getHeader() {
      return !this.password.item.id ? "Нова Парола" : "Редактиране на парола";
    },
  },
  setup() {
    const password = usePasswordStore();
    const env = useEnvStore();

    const functions = {
      handleSubmit: () => {
        password.saveItem();
      },
      handleClose: () => {
        env.dialogs.passwords.savePassword = false;
      },
    };

    return { password, ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
