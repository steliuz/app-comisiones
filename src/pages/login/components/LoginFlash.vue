<template>
  <div class="flex column justify-center items-center q-mt-lg">
    <q-avatar size="130px" text-color="white" class="avatar-shadow">
      <img
        class="border-login cursor-pointer"
        :src="props.userData.avatar ? $FILE_URL + props.userData.avatar : null"
        alt="Avatar User"
        @click="login"
      />
    </q-avatar>
    <q-btn class="q-mt-md" size="sm" color="primary" @click="login">
      Continuar con &nbsp;
      <span class="nameUser">{{ props.userData.user }}</span>
    </q-btn>
    <p class="q-mt-md q-mb-xs">¿ No eres {{ props.userData.user }} ?</p>
    <p class="text-change cursor-pointer" @click="emit('change')">
      Cambiar de cuenta
    </p>
  </div>
</template>

<script setup>
const props = defineProps(["userData"]);

const emit = defineEmits(["loginData", "change"]);

const login = () => {
  let user = {
    email: props.userData.email,
    password: props.userData.password,
  };
  emit("loginData", user);
};
</script>

<style lang="scss" scoped>
.nameUser {
  font-weight: bold;
}

.avatar-shadow {
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.45));
}

.text-change {
  color: #26a69a;
  &:hover {
    color: #1976d2;
  }
}
</style>
