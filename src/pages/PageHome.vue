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
      <q-item v-for="tweet in tweets" :key="tweet.date" class="q-py-md">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle-1">
            <strong>abdelopx</strong>
            <span class="text-grey-7">@abdelopx36</span>
            </q-item-label>
          <q-item-label class="tweet-content text-body1">
            {{ tweet.content }}
          </q-item-label>
          <div class="tweet-icons row justify-between q-pt-md">
            <q-btn flat round color="grey" size="sm" icon="far fa-comment" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
            <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-trash" />
          </div>
        </q-item-section>
        <q-item-section side top>
          {{relativeDate(tweet.date)}}
        </q-item-section>
        
      </q-item>
    </q-list>
    
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { formatDistance } from 'date-fns'

export default defineComponent({
  name: 'PageHome',
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
      this.tweets.unshift(tweet);
      console.log(this.tweets);
    },
    relativeDate(value) {
      return formatDistance(value, new Date()) + " ago";
    }

  }
})
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

</style>