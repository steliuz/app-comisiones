<template>
  <q-item clickable v-ripple :to="link" exact>
    <q-item-section v-if="icon" avatar>
      {{ active }}
      <q-badge class="q-pa-sm rounded" :color="color">
        <q-icon size="20px" color="white" :name="icon" />
      </q-badge>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<!-- v-if="rol && rol.includes(roleUser())" -->

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/user";
import { roleUser } from "src/helpers/userRole";

const store = useUserStore();

const active = ref("");

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  rol: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },

  color: {
    type: String,
    default: "primary",
  },
  position: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 100px;
}

.q-router-link--active {
  background-color: #1f054e;
}
</style>
