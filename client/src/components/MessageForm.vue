<template>
  <div>
    <h2>Message Form</h2>
    <form @submit.prevent="sendMessage">
      <div>
        <label for="message">Message:</label>
        <input type="text" id="message" v-model="message" required />
      </div>
      <div>
        <button type="submit">Send Message</button>
      </div>
    </form>
    <h2>Messages</h2>
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg.content }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      // Make a POST request to send the message
    },
    fetchMessages() {
      // Make a GET request to fetch messages
    },
  },
  mounted() {
    // Fetch messages when the component is mounted
    this.fetchMessages();
  },
};
</script>

<style scoped>
/* ... your styling ... */
</style>
