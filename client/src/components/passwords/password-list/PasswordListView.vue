<template>
  <ul v-if="password.items.length > 0">
    <li
      v-for="(item, index) in password.items"
      :key="item.id"
      class="py-2 px-4 mb-2 rounded shadow"
    >
      <div class="flex justify-between items-center">
        <div>
          <div>{{ item.title }}</div>
          <div class="text-gray-400 font-bold">{{ item.password }}</div>
          <div>{{ item.desc }}</div>
        </div>
        <dropdown-dialog :options="dialogOptions" :id="item.id" />
      </div>
      <!-- dropdown -->
    </li>
  </ul>
  <div v-else>Все още нямате въведени пароли.</div>
</template>

<script>
// stores
import { usePasswordStore } from "@src/stores/password";
import { useEnvStore } from "@src/stores/env";

// dialogs
import DropdownDialog from "@src/components/dialogs/DropdownDialog.vue";

export default {
  name: "PasswordListView",
  components: {
    // dialogs
    DropdownDialog,
  },
  setup() {
    const password = usePasswordStore();
    const env = useEnvStore();

    if (password.items.length === 0) password.getItems();

    const functions = {
      handleClose: () => {},
    };

    const dialogOptions = [
      {
        label: "Редактиране",
        color: "text-black",
        action: (id) => {
          password.item.id = id;
          password.getItem();
          env.dialogs.passwords.savePassword = true;
        },
      },
      {
        label: "Изтриване",
        color: "text-red-500 hover:text-white hover:bg-red-500",
        action: (id) => {
          // TODO:
          console.log(id);
        },
      },
    ];

    return { dialogOptions, password, ...functions };
  },
};
</script>
