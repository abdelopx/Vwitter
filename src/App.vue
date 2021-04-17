<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';

export default {
    async created() {
      this.$store.dispatch('auth/autoLogin');
      await this.$store.dispatch('users/fetchUsers');
    }
}
</script>
