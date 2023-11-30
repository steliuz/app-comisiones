<template>
  <div class="">
    <h6 class="q-my-sm text-uppercase text-center text-weight-regula">
      Iniciar sesión
    </h6>
    <q-form class="" @submit="login">
      <div class="q-my-sm">
        <p class="label-input q-mb-none" for="">Email</p>
        <q-input
          type="text"
          outlined
          v-model="formLogin.email"
          clearable
          color="negative"
          lazy-rules
          :rules="emailRules(formLogin.email)"
        >
          <template v-slot:error>
            <span class="text-negative">
              <q-icon
                class="q-mr-xs"
                size="xs"
                color="negative"
                name="cancel"
              />
              Escribe un correo valido
            </span>
          </template>
        </q-input>
      </div>
      <div class="q-my-sm">
        <p class="label-input q-mb-none">Contraseña</p>
        <q-input
          v-model="formLogin.password"
          color="negative"
          outlined
          clearable
          lazy-rules
          :rules="passwordRules(formLogin.password)"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:error>
            <span>
              <q-icon
                class="q-mr-xs"
                size="xs"
                color="negative"
                name="cancel"
              />
              6+ Caracteres
            </span>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>

      <div>
        <q-checkbox v-model="formLogin.remember" label="Recuérdame" />
      </div>

      <div>
        <q-btn type="submit" class="full-width" color="negative" label="entrar">
        </q-btn>
      </div>
    </q-form>
    <q-linear-progress
      v-if="store.barLoading"
      indeterminate
      rounded
      color="negative"
      class="q-mt-sm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SecureLS from "secure-ls";
import { emailRules, passwordRules } from "src/helpers/rules";
import { useUserStore } from "stores/user";

const emit = defineEmits(["loginData"]);

let ls = new SecureLS({ isCompression: false, encodingType: "aes" });
const isPwd = ref(true);

const store = useUserStore();

const formLogin = ref({
  email: "",
  password: "",
  remember: false,
});

const login = () => {
  let user = {
    email: formLogin.value.email,
    password: formLogin.value.password,
  };
  emit("loginData", user);
  setTimeout(() => {
    saveData();
  }, 1000);
};

const getDataLocal = () => {
  let form = ls.get("userLogin");
  if (form) {
    formLogin.value = form;
  }
  store.handlebarLoading(false);
};

const saveData = () => {
  let rmb = formLogin.value.remember;
  if (rmb == true) {
    let x = JSON.parse(localStorage.getItem("user")) || [];
    ls.set("userLogin", {
      email: formLogin.value.email,
      password: formLogin.value.password,
      remember: formLogin.value.remember,
      user: x.user.name,
      avatar: x.user.avatar,
    });
  } else {
    ls.remove("userLogin");
  }
};

onMounted(() => {
  getDataLocal();
});
</script>

<style lang="scss" scoped></style>
