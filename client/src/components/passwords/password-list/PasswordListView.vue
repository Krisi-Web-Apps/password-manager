<template>
  <simple-dialog @close="handleClose">
    <template v-slot:header>Списък с Пароли</template>
    <template v-slot:body>
      <ul>
        <li
          v-for="(item, index) in password.items"
          :key="item.id"
          class="py-2 px-4 mb-2 rounded shadow"
        >
        <div class="flex justify-between items-center">
          <div>
            <div>{{ item.title }}</div>
            <div class="text-gray-400">{{ item.password }}</div>
          </div>
          <div>
            <button class="button">Опции</button>
          </div>
        </div>
        </li>
      </ul>
    </template>
  </simple-dialog>
</template>

<script>
// stores
import { usePasswordStore } from "@src/stores/password";

// dialogs
import SimpleDialog from "@src/components/dialogs/SimpleDialog.vue";

export default {
  name: "PasswordListView",
  components: {
    // dialogs
    SimpleDialog,
  },
  setup() {
    const password = usePasswordStore();

    password.getItems();

    const functions = {
      handleClose: () => {},
    };

    return { password, ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
