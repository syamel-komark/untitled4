<template>
  <div className="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout"/>
    <h2>Jobsheet Number: {{ jobsheetNumber }}</h2>
    <div>
      <!-- Display the filtered schedule data -->
      <div v-for="schedule in filterSchedule" :key="schedule.id">
        <!-- Display the properties of each schedule -->
        <p>Current Process: {{ schedule.process }}</p>
        <p>Update Process</p>
        <select v-model="updatedProcess">
          <option value="">Select a Process</option>
          <option v-for="machineData in processList" :key="machineData.process" :value="machineData.process">{{ machineData.process }}</option>
        </select>
        <!-- Add more properties as needed -->
      </div>
    </div>
    <button @click="update">Submit</button>

  </div>
  <div class="success-modal" v-if="showSuccessModal">
    <div class="table-container">
      <div class="success-content">
        <p>{{ this.successMessage }}</p>
        <button @click="this.showSuccessModal=false">Close</button>
      </div>
    </div>
  </div>


</template>

<script>
import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";

export default {
  components: {
    HeaderBar,
  },

  data() {
    return {
      showSuccessModal: false,
      successMessage: '',
      updatedProcess: '',
      processList: [],
      selectedSchedule:[],
      selectedJobsheet:[],
      currentProcess:'',
      scheduleInfo:[],
      username: null,
      currentTime: null,
      jobsheetNumber: null, // Add this property to store the jobsheetNumber
    };
  },

  created() {

    this.getInfo()
    // Retrieve username from session storage
    this.username = sessionStorage.getItem('username') || '';

    this.getProcess();

    // Get current time
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();

    // Get jobsheetNumber from the route params
    this.jobsheetNumber = this.$route.query.jobsheetNumber;
    console.log(this.jobsheetNumber);

    // Update current time every second
    this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000);
  },

  beforeUnmount() {
    // Clear the interval when the component is destroyed
    clearInterval(this.currentTimeInterval);
  },

  computed: {
    filterSchedule() {
      if (!this.jobsheetNumber || !this.scheduleInfo) {
        // If no jobsheetNumber or scheduleInfo is available, return an empty array
        return [];
      }

      // Filter the scheduleInfo based on the jobsheetNumber
      return this.scheduleInfo.filter(schedule => schedule.jobsheet === parseInt(this.jobsheetNumber));
    },
  },

  methods: {

    async update() {
      try {
        const response = await axios.put('/api/updatecurrent', {
          process: this.updatedProcess,
          jobsheet: this.jobsheetNumber,
        });

        if (response.status === 200) {
          console.log('Schedule updated successfully.');
          this.showSuccessModal= true;
          this. successMessage ='Process Updated Successfully';
          await this.getInfo()
          // Optionally, you can update your local data or perform other actions here.
        } else {
          console.error('Error updating schedule:', response.data.error);
          // Handle the error, e.g., display an error message to the user.
        }
      } catch (error) {
        console.error('Error updating schedule:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    },

    async getProcess() {
      try {
        const response = await axios.get('/api/getfixedcost');
        this.processList = response.data.map((machineData) => {
          return {
            department: machineData.department,
            process: machineData.process,
            maxcapacity:machineData.maxcapacity,

            // Add other properties here as needed
          };
        });
        console.log(this.processList);
      } catch (error) {
        console.error('Error fetching fixedcost:', error);
      }
    },


    async getInfo(){
      try {
        const response = await axios.get('/api/getschedule');
        this.scheduleInfo = response.data;
        console.log(this.scheduleInfo);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
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
