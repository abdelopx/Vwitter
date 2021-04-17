<template>
  <q-item class="q-py-md">
    <q-item-section avatar top>
      <q-avatar>
        <img :src="profilePicture">
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-subtitle-1">
        <strong class="q-mr-sm">{{tweetUser.name}}</strong>
        <span class="text-grey-7">@{{tweetUser.twitterTag}}
          <br class="lt-sm"> &bull; {{relativeDate(date)}}
        </span>
      </q-item-label>
      <q-item-label class="tweet-content text-body1">
        {{ content }}
      </q-item-label>
      <div class="row justify-evenly q-pt-md">
        <q-btn flat round color="grey" size="sm" icon="far fa-comment" />
        <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
        <q-btn @click="likeClicked(id,liked,content,date)" flat round :color="liked ? 'pink' : 'grey'" size="sm" :icon="liked ? 'fas fa-heart' : 'far fa-heart'" />
        <q-btn v-if="isUserOfTweet" @click="deleteTweet(id)" flat round color="grey" size="sm" icon="fas fa-trash" />
        <q-btn v-else flat round color="grey" size="sm" icon="fas fa-share" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
  import {
    formatDistance
  } from 'date-fns';
  export default {
    created() {
      this.findByUserId();
   },
    data() {
      return {
        tweetUser: undefined,
      };
    },
    props: ['content', 'date', 'id', 'liked','userId','users','actualUserId'],
    computed: {
      profilePicture() {
        return this.tweetUser.profilePicture;
      },
      isUserOfTweet() {
        if (this.actualUserId === this.userId) {
          return true;
        }
        else {
          return false;
        }
      }

    },
    methods: {
      findByUserId() {
        const users = this.$store.getters['users/getUsers'];

        this.tweetUser = users.find(user => user.userId === this.userId);
      },
      relativeDate(value) {
        return formatDistance(value, new Date()) + " ago";
      },

      async deleteTweet(id) {
        try {
          await this.$store.dispatch('tweets/deleteTweet', id);
        } catch (error) {
          console.log(error);
        }
      },

      likeClicked(id,liked,content,date) {
        this.$store.dispatch('tweets/likeButton',{
          id,
          content,
          date,
          liked,
        });
       },
    },
  }

</script>

<style scoped>


</style>
