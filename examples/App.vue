<template>
  <div
    id="app"
    :class="{ 'is-component': isComponent }"
  >
    <main-header />
    <div class="main-cnt">
      <router-view />
    </div>
    <main-footer v-if="!isComponent" />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isComponent() {
      return /^component-/.test(this.$route.name || '');
    }
  }
};
</script>
