<template>
  <div class="auth-color fullscreen relative-position">
    <div class="q-mt-sm text-white absolute-center">
      <div>
        <q-icon class="q-pa-md" name="fab fa-twitter" size="xl" color="primary"></q-icon>
      </div>
      <div class="q-mt-xl text-h4 text-weight-bold text-black">
        <p>Log in into Vwitter.</p>
      </div>

      <form @submit.prevent="signIn">
        <div class="q-mt-lg q-gutter-lg">
          <q-input class="input" rounded type="text" v-model.trim="email" outlined label="Phone, email, or username" label-color="black" />
          <q-input class="input" rounded type="password" v-model.trim="password"  outlined label="Password" label-color="black" />
          <q-btn class="q-pl-xl q-pr-xl" type="submit" size="md" unelevated rounded color="primary" label="Login" />
        </div>

      </form>



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
        email: '',
        password: '',
      }
    },
    methods: {
        async signIn() {
            const payload = {
                email: this.email,
                password: this.password,
            };
            try {
            await this.$store.dispatch('auth/signin',payload);
            } catch(error) {
              console.log(error);
            }
            this.$router.replace('/');
        },
    }
  }

</script>

<style scoped>
  .auth-color {
    background-color: white;
  }
  .input { color: white; }

  .input-border {
    border: 1px solid rgb(107, 107, 107);
  }
  .input-border-selected {
    border: 1px solid #1da1f2;
  }

</style>
