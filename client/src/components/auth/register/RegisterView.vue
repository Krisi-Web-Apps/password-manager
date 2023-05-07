<template>
  <simple-dialog @close="handleClose">
    <template v-slot:header>Register</template>
    <template v-slot:body>
      <div class="px-5">
        <form @submit.prevent="handleRegister">
          <p class="text-red-500 text-center">{{ user.error }}</p>
          <div class="mb-5">
            <label for="first_name">Малко Име</label>
            <input
              type="text"
              placeholder="Въведете малкото си име..."
              id="first_name"
              class="w-full py-2 px-4 mt-2 rounded border"
              v-model="user.credentials.first_name"
              :disabled="user.loading"
            />
          </div>
          <div class="mb-5">
            <label for="last_name">Фамилия</label>
            <input
              type="text"
              placeholder="Въведете фамилията си..."
              id="last_name"
              class="w-full py-2 px-4 mt-2 rounded border"
              v-model="user.credentials.last_name"
              :disabled="user.loading"
            />
          </div>
          <div class="mb-5">
            <label for="username">Потребителско Име</label>
            <input
              type="text"
              placeholder="Въведете потребителско име..."
              id="username"
              class="w-full py-2 px-4 mt-2 rounded border"
              v-model="user.credentials.username"
              :disabled="user.loading"
            />
          </div>
          <div class="mb-5">
            <label for="email">Имейл Адрес</label>
            <input
              type="email"
              placeholder="Въведете имейл адреса си..."
              id="email"
              class="w-full py-2 px-4 mt-2 rounded border"
              v-model="user.credentials.email"
              :disabled="user.loading"
            />
          </div>
          <div class="mb-5">
            <label for="password">Парола</label>
            <input
              type="password"
              placeholder="Въведете парола..."
              id="password"
              class="w-full py-2 px-4 mt-2 rounded border"
              v-model="user.credentials.password"
              :disabled="user.loading"
            />
          </div>
          <div class="mb-5">
            <label for="cpassword">Повторете Паролата</label>
            <input
              type="password"
              placeholder="Въведете паролата отново..."
              id="cpassword"
              class="w-full py-2 px-4 mt-2 rounded border"
              v-model="user.credentials.cpassword"
              :disabled="user.loading"
            />
          </div>
          <div class="mb-5 flex items-center">
            <input
              type="checkbox"
              id="terms"
              class="checkbox"
              v-model="user.credentials.terms"
            />
            <label for="terms" class="pl-2"
              >Съгласен/а съм с Общите условия</label
            >
          </div>
          <div class="mb-5">
            <button @click="handleOpenLogin" class="px-2 rounded">
              Вече имате профил?
            </button>
          </div>
          <button type="submit" class="button" :disabled="user.loading">
            Създай профил
          </button>
        </form>
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
      handleRegister: () => {
        user.register();
      },
      handleOpenLogin: () => {
        env.dialogs.auth.login = true;
        env.dialogs.auth.register = false;
      },
      handleClose: () => {
        env.dialogs.auth.register = false;
      },
    };
    return { user, ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
