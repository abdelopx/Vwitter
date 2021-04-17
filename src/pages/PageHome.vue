<template>
  <q-page class="relative-position">
    <q-scroll-area
      class="absolute full-width full-height"
      :thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle"
    >
    <div class="q-py-lg q-px-md items-end row items-end q-col-gutter-md">
      <div class="col">
        <q-input class="new-tweet" bottom-slots v-model="newTweet" placeholder="What's happening ?" counter maxlength="280" autogrow>
        <template v-slot:before>
          <q-avatar size="xl">
            <img :src="profilePicture">
          </q-avatar>
        </template>
      </q-input>
      </div>
      <div class="col-shrink">
        <q-btn @click="addNewTweet" class="q-mb-lg" unelevated rounded no-caps color="primary" label="Tweet" :disable="!newTweet" />
      </div>
    </div>
    <q-separator class="separator" size="10px" color="grey-2"/>
    <q-list>
  <div v-if="isLoading" class="absolute-center">
    <q-spinner-oval
          color="primary"
          size="lg"
          :thickness="15"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerOval</q-tooltip>
  </div>
  <transition-group
  v-else-if="!isLoading"
  appear
  enter-active-class="animated fadeIn slow"
  leave-active-class="animated fadeOut slow">
      <tweet-item class="tweet-item" v-for="tweet in fetchedTweets"
      :key="tweet.id"
      :id="tweet.id"
      :content="tweet.content"
      :date="tweet.date"
      :liked="tweet.liked"
      :userId="tweet.userId"
      :users="users"
      :actualUserId="actualUser.userId"
      ></tweet-item>
  </transition-group>
    </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import TweetItem from '../components/TweetItem.vue';

export default {
  components: {
    TweetItem,
  },
  created() {
    this.loadTweets();
    this.fetchActualUser();
    this.fetchUser();
  },
  data() {
    return {
      newTweet: '',
      isLoading: false,
      actualUser: null,
      users: null,
    };
  },
  computed: {
    fetchedTweets() {
      return this.$store.getters['tweets/getTweets'];
    },
    profilePicture() {
      return this.actualUser.profilePicture;
    },
    
  },
  methods: {
    async addNewTweet(){
      const tweet = {
        content: this.newTweet,
        date: Date.now(),
        liked: false, 
        userId: this.$store.getters['users/userId'],    
        }
      this.newTweet = '';
      try {
        this.$store.dispatch('tweets/addTweet',tweet);
      } catch(err) {
        console.log(err);
      }
    },

    async loadTweets() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('tweets/fetchTweets');
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    fetchActualUser() {
      this.actualUser = this.$store.getters['users/getActualUser'];
    },

    fetchUser() {
         this.users = this.$store.getters['users/getUsers'];
       },

    
  }
}
</script>

<style lang="sass">

.new-tweet
  text-area
    font-size: 19px
    line-height: 1.4

.separator
  border-top: solid 1px
  border-bottom: solid 1px
  border-color: $grey-4

.tweet-content
  white-space: pre-line

.tweet-item:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)

</style>