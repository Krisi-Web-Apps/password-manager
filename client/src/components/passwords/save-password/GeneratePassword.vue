<template>
  <simple-dialog @close="handleClose">
    <template v-slot:header>Генериране на парола</template>
    <template v-slot:body>
      <form class="px-5 mb-5">
        <div class="mb-5">
          <label for="suggestion_password_length">Дължина</label>
          <input
            type="number"
            id="suggestion_password_length"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="password.suggestion.length"
            @change="password.generatePassword"
          />
        </div>
        <div class="mb-5 flex items-center">
          <input
            type="checkbox"
            id="suggestion_password_symbols"
            class="checkbox"
            v-model="password.suggestion.permissions.symbols"
            @change="password.generatePassword"
          />
          <label for="suggestion_password_symbols" class="pl-2">Символи</label>
        </div>
        <div class="mb-5 flex items-center">
          <input
            type="checkbox"
            id="suggestion_password_numbers"
            class="checkbox"
            v-model="password.suggestion.permissions.numbers"
            @change="password.generatePassword"
          />
          <label for="suggestion_password_numbers" class="pl-2">Цифри</label>
        </div>
        <div class="mb-5 flex items-center">
          <input
            type="checkbox"
            id="suggestion_password_uppercase_letters"
            class="checkbox"
            v-model="password.suggestion.permissions.uppercaseLetters"
            @change="password.generatePassword"
            @click="(event) => beforeInput(event.target.value)"
          />
          <label for="suggestion_password_uppercase_letters" class="pl-2">
            Главни букви
          </label>
        </div>
        <div class="mb-5 flex items-center">
          <input
            type="checkbox"
            id="suggestion_password_lowercase_letters"
            class="checkbox"
            v-model="password.suggestion.permissions.lowercaseLetters"
            @change="password.generatePassword"
          />
          <label for="suggestion_password_lowercase_letters" class="pl-2">
            Малки букви
          </label>
        </div>
        <div class="mb-5">
          <label for="suggestion_password_text">Предложена Парола</label>
          <input
            type="text"
            id="suggestion_password_text"
            class="w-full py-2 px-4 mt-2 rounded border"
            v-model="password.suggestion.passwordText"
          />
        </div>
        <div class="flex gap-5">
          <button type="button" class="button" @click="handleThisPassword">
            Използване на тази парола
          </button>
          <button
            type="button"
            class="button"
            @click="password.generatePassword"
          >
            Генериране отново
          </button>
        </div>
      </form>
    </template>
  </simple-dialog>
</template>

<script>
import { app } from "@src/main";

// stores
import { useEnvStore } from "@src/stores/env";

// dialogs
import SimpleDialog from "@src/components/dialogs/SimpleDialog.vue";
import { usePasswordStore } from "@src/stores/password";

export default {
  name: "GeneratePassword",
  components: {
    // dialogs
    SimpleDialog,
  },
  setup() {
    const env = useEnvStore();
    const password = usePasswordStore();

    password.generatePassword();

    const functions = {
      handleThisPassword: () => {
        password.item.password = password.suggestion.passwordText;
        env.dialogs.passwords.generatePassword = false;
        app.$toast.success("Използвате тази парола!");
      },
      handleClose: () => {
        env.dialogs.passwords.generatePassword = false;
      },
    };

    return { env, password, ...functions };
  },
};
</script>
