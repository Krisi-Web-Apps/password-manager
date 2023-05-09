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
  <transition>
    <confirm-dialog
      v-if="env.dialogs.global.confimDialog"
      @close="onCancel"
      @confirm="onConfirm"
    >
      <template v-slot:header>
        Сигурен/а ли сте, че искате да изтриете този запис?
      </template>
      <template v-slot:body>
        <div class="px-5 mb-5">
          <div>Заглавие: {{ password.item.title }}</div>
          <div>Парола: {{ password.item.password }}</div>
          <div>Описание: {{ password.item.desc }}</div>
        </div>
      </template>
    </confirm-dialog>
  </transition>
</template>

<script>
// stores
import { usePasswordStore } from "@src/stores/password";
import { useEnvStore } from "@src/stores/env";

// dialogs
import DropdownDialog from "@src/components/dialogs/DropdownDialog.vue";
import ConfirmDialog from "@src/components/dialogs/ConfirmDialog.vue";

export default {
  name: "PasswordListView",
  components: {
    // dialogs
    DropdownDialog,
    ConfirmDialog,
  },
  setup() {
    const password = usePasswordStore();
    const env = useEnvStore();

    if (password.items.length === 0) password.getItems();

    const functions = {
      onConfirm: () => {
        password.deleteItem();
      },
      onCancel: () => {
        env.dialogs.global.confimDialog = false;
      },
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
          password.item.id = id;
          password.getItem();
          env.dialogs.global.confimDialog = true;
        },
      },
    ];

    return { dialogOptions, env, password, ...functions };
  },
};
</script>
