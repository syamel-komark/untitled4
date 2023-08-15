<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Mastercard info</h2>
    <div class="success-modal" v-if="searchMastercard">
      <div class="table-container">
        <h2>Mastercard List</h2>
        <div class="searchmaterial-menu">
          <input
              type="text"
              v-model="searchQuery"
              @input="filtermastercard"
              placeholder="Search by Mastercard Number"
          />
        </div>
        <table>
          <thead>
          <tr>
            <th>Mastercard Number</th>
            <th>Label name</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="mastercard in filterMastercard" :key="mastercard.id">
            <td>{{ mastercard.mastercard }}</td>
            <td>{{ mastercard.labelname }}</td>
            <td>
              <button @click="pickMastercard(mastercard)">Use</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div><button @click=closeMastercardSearch>Close</button>
    </div>
      <div>
        <label for="Mastercard">Mastercard Number:</label>
        <input type="text" id="Mastercard" v-model="masterCard" readonly />
      </div>
      <div>
        <label for="labelName">Label Name:</label>
        <input type="text" id="labelName" v-model="labelName" readonly />
      </div>
      <div>
        <label for="Material">Material: </label>
        <input type="text" id="material" v-model="material" readonly />
      </div>
      <div>
        <label for="width">Width (mm):</label>
        <input type="number" id="width" v-model="width" readonly />
      </div>
      <div>
        <label for="pitch">Pitch (mm):</label>
        <input type="number" id="pitch" v-model="pitch" readonly />
      </div>
      <div>
        <button @click="redirectTo('/newlabel')">back</button>      </div>

  </div>
</template>

<script>
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";
export default {

  components: {
    HeaderBar,
  },

  data() {
    return {
      masterCard:null,
      labelName: null,
      material: null,
      width: null,
      pitch: null,
      username: null,
      currentTime: null,
      mastercard:[],
      searchMastercard: true,
      searchQuery: '',
    };
  },


  created() {

    this.fetchMastercardinfo();


    // Retrieve username from session storage
    this.username = sessionStorage.getItem('username') || '';

    // Get current time
    const now = new Date();
    this.currentTime = now.toLocaleTimeString()

    // Update current time every second
    this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000);

  },

  beforeUnmount() {
    // Clear the interval when the component is destroyed
    clearInterval(this.currentTimeInterval);
  },

  computed: {
    filterMastercard() {
      if (this.searchQuery === '') {
        return this.mastercard;
      } else {
        const query = this.searchQuery;
        return this.mastercard.filter(mastercard => {
          return mastercard.mastercard.includes(query);
        });
      }
    },
  },


  methods: {

    pickMastercard(selectedMastercard) {
      this.masterCard = selectedMastercard.mastercard; // Set the selected material
      this.labelName = selectedMastercard.labelname; // Set the selected material
      this.material = selectedMastercard.material; // Set the selected material
      this.width = selectedMastercard.width; // Set the selected material
      this.pitch = selectedMastercard.pitch; // Set the selected material

      this.searchMastercard = false;
    },

    async fetchMastercardinfo() {
      try {
        const response = await axios.get('/api/getmastercard');
        this.mastercard = response.data;
        console.log(this.mastercard);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },


    closeMastercardSearch(){
      this.searchMastercard=false;

    },

    updateCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    redirectTo(path) {
      this.$router.push(path);
    },

  },
};
</script>

<style scoped>

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
