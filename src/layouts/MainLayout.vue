<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />

        <div class="q-ml-auto q-mr-sm text-capitalize text-bold">
          {{ store.$state.user.name }}
        </div>
        <q-avatar class="cursor-pointer">
          <img class="border-white" :src="$FILE_URL + avatar" />
          <q-menu
            style="min-width: 170px"
            class="flex justify-center hide-scrollbar"
            square
            max-width="170px"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="80px">
                  <img :src="$FILE_URL + avatar" />
                </q-avatar>
                <div
                  class="flex justify-center items-center"
                  style="margin-top: -10px; z-index: 1200"
                >
                  <q-badge
                    class="q-py-xs q-px-sm"
                    rounded
                    :class="`bg-${roleUser(store.$state.user.role).bg}`"
                    text-color="white"
                  >
                    <span class="text-bold"
                      >{{ roleUser(store.$state.user.role).name }}
                    </span>
                  </q-badge>
                </div>

                <div class="column items-center q-mt-md">
                  <q-btn
                    class="q-mr-xs q-mb-xs"
                    color="positive"
                    size="sm"
                    unelevated
                    outline
                    v-close-popup
                    label="Editar Perfil"
                    @click="router.push('/perfil')"
                  />
                  <q-btn
                    color="negative"
                    icon="logout"
                    label="Salir"
                    size="xs"
                    unelevated
                    v-close-popup
                    @click="handleLogout"
                  />
                </div>
              </div>
            </div>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="250"
      :breakpoint="500"
      class="bg-primary"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <EssentialLink
            v-for="(link, index) in linksList"
            :key="index"
            v-bind="link"
            :index="index"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="window-height bg-custom">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";
import { roleUser } from "src/helpers/userRole";
import { logout } from "src/services/authService";

const router = useRouter();

const store = useUserStore();
const leftDrawerOpen = ref(false);
const drawer = ref(false);
const miniState = ref(true);

const avatar = ref(store.user.avatar);

name: "MainLayout";

const linksList = [
  {
    id: 0,
    title: "Administradores",
    icon: "admin_panel_settings",
    link: "/person_admin",
    color: "orange-7",
    rol: [1],
  },
  {
    id: 1,
    title: "Asistentes",
    icon: "person",
    link: "/assistants",
    color: "orange-7",
    rol: [1, 2, 3, 4],
  },
  {
    id: 2,
    title: "Rifas",
    icon: "local_activity",
    link: "/raffles",
    color: "orange-7",
    rol: [1, 2, 3, 4, 5],
  },
  {
    id: 3,
    title: "Metodos de pago",
    icon: "account_balance",
    link: "/payment",
    color: "orange-7",
    rol: [1, 2, 3, 4],
  },
  {
    id: 4,
    title: "Vendedores",
    icon: "person",
    link: "/sellers",
    color: "orange-7",
    rol: [5],
  },
  {
    id: 5,
    title: "Perzonalizar",
    icon: "tune",
    link: "/custom",
    color: "orange-7",
    rol: [1, 4],
  },
];

// const activeTabIndex = ref([]);

// const addActiveTabIndex = (value) => {
//   activeTabIndex.value = [];
//   activeTabIndex.value.push(value);
// };

const handleLogout = async () => {
  router.push("/");

  // try {
  //   store.barLoading = true;
  //   await logout().then(() => {
  //     router.push("/");
  //   });
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   let loading = store.barLoading;
  //   store.handlebarLoading(loading);
  // }
};

const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false;
    e.stopPropagation();
  }
};

watch(
  () => store.user.avatar,
  (newVal) => {
    avatar.value = newVal;
  }
);
</script>
