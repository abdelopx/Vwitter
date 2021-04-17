<template>
  <div class="auth-color fullscreen relative-position">
    <div class="text-white absolute-center">
      <div>
        <q-icon class="q-pa-md" name="fab fa-twitter" size="xl" color="primary"></q-icon>
        <p class="gt-sm q-mt-xl text-h4 text-weight-bold text-black">Register in Vwitter.</p>
      </div>
      

      <form @submit.prevent="signUp">
        <div class="q-mt-lg q-gutter-lg" v-if="!isNextAtt">
          <q-input class="input" rounded type="email" v-model.trim="email"  outlined label="Phone, email, or username" label-color="black" />
          <q-input class="input" rounded type="text" v-model="name"  outlined label="Your name" label-color="black" />
          <q-input class="input" rounded type="text" v-model.trim="twitterTag"  outlined label="Your Vwitter tag" label-color="black" />
          <q-input class="input" rounded type="password" v-model.trim="password"  outlined label="Password" label-color="black" />
          <q-btn class="q-pl-xl q-pr-xl" @click="isNext" size="md" unelevated rounded color="primary" label="Next" />
        </div>
        <div class="q-mt-lg q-gutter-lg" v-else>
          <q-file outlined v-model="image">
          <template v-slot:prepend>
          <q-icon name="attach_file"/>
          </template>
          </q-file>
          <q-btn class="q-pl-xl q-pr-xl" @click="isNext" size="md" unelevated rounded color="primary" label="Go back" />
          <q-btn class="q-pl-xl q-pr-xl" @click="uploadProfileImage" size="md" unelevated rounded color="primary" label="Confirm picture" />
          <div><q-btn v-if="!uploading" class="q-pl-xl q-pr-xl" type="submit" size="md" unelevated rounded color="primary" label="Register" /></div>
        </div> 
      </form>
    </div>
  </div>
</template>

<script>
import {db,fb} from '../../boot/firebase.js';
  export default {
    data() {
      return {
        email: '',
        name: '',
        twitterTag: '',
        password: '',
        confirmPassword: '',
        image: null,
        uploading: false,
        isNextAtt: false,
      }
    },
    methods: {
        signUp() {
            const payload = {
                email: this.email,
                name: this.name,
                twitterTag: this.twitterTag,
                password: this.password,
                profilePicture: this.image,
            };
            this.$store.dispatch('auth/signup',payload);
            this.$router.replace('/');
        },

        uploadProfileImage() {
          this.uploading = true;
          var storageRef = fb.storage().ref('profileImages/' + this.image.name);

          let uploadTask = storageRef.put(this.image);

          uploadTask.on('state_changed',(snapshot) => {

                }, (error) => {

                }, () => {
                  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.image = downloadURL;
                    this.uploading = false;
                  });
                }
              );
        },
        isNext() {
          console.log(this.isNextAtt);
          this.isNextAtt = !this.isNextAtt;
          return this.isNextAtt;
        }
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
