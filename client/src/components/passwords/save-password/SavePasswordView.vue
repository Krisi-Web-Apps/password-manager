<template>
  <simple-dialog @close="handleClose">
    <template v-slot:header>{{ getHeader }}</template>
    <template v-slot:body>
      <form @submit.prevent="handleSubmit" class="px-5 mb-5">
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
          <textarea
            placeholder="Въведете някакво описание..."
            id="desc"
            rows="6"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="password.item.desc"
            :disabled="password.loading"></textarea>
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
        <button
          type="button"
          class="button mb-5"
          :disabled="password.loading"
          @click="() => handleOpen({ key: 'generatePassword' })"
        >
          Генериране на парола
        </button>
        <p class="mb-5">Полетата със звездичка са задължителни!</p>
        <button type="submit" class="button" :disabled="password.loading">
          Запазване на паролата
        </button>
      </form>
      <transition>
        <generate-password v-if="env.dialogs.passwords.generatePassword" />
      </transition>
    </template>
  </simple-dialog>
</template>

<script>
// stores
import { usePasswordStore } from "@src/stores/password";
import { useEnvStore } from "@src/stores/env";

// dialogs
import SimpleDialog from "@src/components/dialogs/SimpleDialog.vue";

// components
import GeneratePassword from "@src/components/passwords/save-password/GeneratePassword.vue";

export default {
  name: "SavePasswordView",
  components: {
    // dialogs
    SimpleDialog,

    // components
    GeneratePassword,
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
      open: {
        generatePassword: () => {
          env.dialogs.passwords.generatePassword = true;
        }
      },
      handleSubmit: () => {
        password.saveItem();
      },
      handleClose: () => {
        env.dialogs.passwords.savePassword = false;
      },
      handleOpen: ({ key }) => {
        functions.open[key]();
      },
    };

    return { env, password, ...functions };
  },
};
</script>
