<template>
  <div v-if="isAdmin" class="admin-menu">
    <h3>Admin Menu</h3>
    <button @click="redirectTo('/register')">Register User</button>
  </div>
</template>

<script>
export default {
  props: {
    isAdmin: Boolean,
  },
  methods: {
    redirectTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.admin-menu {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
