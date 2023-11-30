<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row">
      <div class="col-sm-7 col-md-8 window-height bg-primary box-shadow"></div>
      <div class="col-12 col-sm-5 col-md-4">
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script setup></script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: 5px 2px 15px rgba(0, 0, 0, 0.35);
}
</style>
