<template>
  <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle-1">
            <strong class="q-mr-sm">abdelopx</strong>
            <span class="text-grey-7">@abdelopx36
                <br class="lt-sm">&bull; {{relativeDate(date)}}
            </span>
            </q-item-label>
          <q-item-label class="tweet-content text-body1">
            {{ content }}
          </q-item-label>
          <div class="tweet-icons row justify-between q-pt-md">
            <q-btn flat round color="grey" size="sm" icon="far fa-comment" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
            <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
            <q-btn @click="deleteTweet" flat round color="grey" size="sm" icon="fas fa-trash" />
          </div>
        </q-item-section>
      </q-item>
</template>

<script>
import { formatDistance } from 'date-fns';
export default {
    emits: ['deleteTweet'],
    props: ['content','date'],
    methods: {
        relativeDate(value) {
            return formatDistance(value, new Date()) + " ago";
        },
        deleteTweet() {
            this.$emit('deleteTweet');
        },
    },
}
</script>

<style>

</style>