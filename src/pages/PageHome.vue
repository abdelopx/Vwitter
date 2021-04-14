<template>
  <q-page>
    <div class="q-py-lg q-px-md items-end row items-end q-col-gutter-md">
      <div class="col">
        <q-input class="new-tweet" bottom-slots v-model="newTweet" placeholder="What's happening ?" counter maxlength="280" autogrow>
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
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
  <transition-group
  appear
  enter-active-class="animated fadeIn slow"
  leave-active-class="animated fadeOut slow">
      <tweet-item class="tweet-item" v-for="tweet in tweets"
      @delete-tweet="deleteTweet(tweet)"
      :key="tweet.date"
      :content="tweet.content"
      :date="tweet.date"
      ></tweet-item>
  </transition-group>
    </q-list>

    
    
  </q-page>
</template>

<script>

import TweetItem from '../components/TweetItem.vue';

export default {
  components: {
    TweetItem,
  },
  data() {
    return {
      newTweet: '',
      tweets: [
        {
          content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit Beate odit enim, sint nequ",
          date: 1618414579756,
        },
        {
          content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit Beate odit enim, sint nequ",
          date: 1618414629013,
        },
      ],
    };
  },
  methods: {
    addNewTweet(){
      const tweet = {
        content: this.newTweet,
        date: Date.now(),
      }
      this.newTweet = '';
      this.tweets.unshift(tweet);
    },
    deleteTweet(tweetSelected) {
      let index = this.tweets.findIndex(tweet => tweet.date === tweetSelected.date);
      this.tweets.splice(index,1);
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

.tweet-icons
  margin-left: -5px

.tweet-item:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)

</style>