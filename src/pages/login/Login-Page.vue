<template>
  <section
    class="relative-position column inline justify-center items-stretch full-width window-height q-px-xl"
  >
    <div class="row">
      <div class="col-12">
        <div class="flex column justify-center">
          <loginFlash
            v-if="userFlash != ''"
            :userData="userFlash"
            @loginData="postLogin"
            @change="changeUser"
          ></loginFlash>
          <inputsLogin v-else @loginData="postLogin"></inputsLogin>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import inputsLogin from "src/pages/login/components/FormLogin.vue";
import loginFlash from "src/pages/login/components/LoginFlash.vue";
import { useRouter } from "vue-router";
import SecureLS from "secure-ls";
import { useUserStore } from "stores/user";
import { login } from "src/services/authService";

let ls = new SecureLS({ isCompression: false, encodingType: "aes" });

const userFlash = ref("");

const store = useUserStore();
const router = useRouter();

const postLogin = async (value) => {
  store.handlebarLoading(true);

  setTimeout(() => {
    router.push("/dashboard");
  }, 800);

  // try {
  //   await login(value).then((data) => {
  //     store.userAuth(data.user);

  //     setTimeout(() => {
  //       router.push("/dashboard");
  //     }, 800);
  //   });
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   store.handlebarLoading(false);
  // }
};

const changeUser = () => {
  ls.remove("userLogin");

  getDataUser();
};

const getDataUser = () => {
  userFlash.value = ls.get("userLogin");
};

onMounted(() => {
  getDataUser();
});
</script>
