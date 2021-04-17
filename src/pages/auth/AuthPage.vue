<template>
<div class="auth-color fullscreen relative-position">
    <div class="text-white absolute-center">
        <div>
            <q-icon class="q-pa-md" name="fab fa-twitter" size="xl" color="white"></q-icon>
        </div>
        <div class="q-mt-xl text-h2 text-weight-bolder">
          <p>Happening now</p>
        </div>
        <div class="q-mt-xl text-h4 text-weight-bold">
          <p>Join Vwitter.</p>
        </div>
        <div class="q-mt-lg q-gutter-lg">
          <router-link to="/login">
            <q-btn class="q-pl-xl q-pr-xl" size="md" unelevated rounded color="primary" label="Login" />
            </router-link>
          <router-link to="/register"><q-btn class="q-pl-xl q-pr-xl q-mr-lg" size="md" unelevated rounded color="primary" label="Sign up" /></router-link>
        </div>
</div>
</div>

  <!-- <q-layout view="hHh lpr fFf">

    <q-drawer class="drawer-color" :breakpoint="0" show-if-above v-model="right" side="right" bordered :width="640" dark >
      
    </q-drawer>

    
    <q-footer reveal class="bg-dark text-white ">
      <q-toolbar class="q-ma-auto relative-position">
          <div class="absolute-center"><p class="text-grey-8">About Help Center Directory Settings © 2021 Twitter, Inc.</p></div>
      </q-toolbar>
    </q-footer>

  </q-layout> -->
</template>

<script>
  export default {
    data() {
      return {
        right: false
      }
    },
  }

</script>

<style scoped>
.auth-color {
    background-color: black;
}

a { text-decoration: none; }
</style>
