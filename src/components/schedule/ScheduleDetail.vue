<script setup>
import { ref } from "vue";
const collapsed = ref(false);
const selectedKeys = ref(["1"]);
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout v-model:collapsed="collapsed" collapsible>
      <div class="logo"></div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span></span>
        </a-menu-item>
        <AttractionCardList />
      </a-menu>
    </a-layout>

    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"></div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <div>
        <MapView></MapView>
      </div>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
