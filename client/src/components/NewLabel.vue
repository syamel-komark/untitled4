<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>New Label</h2>
    <form @submit.prevent="submitLabel" novalidate>
      <div>
        <label for="Mastercard">Mastercard Number:</label>
        <input type="text" id="Mastercard" v-model="masterCard" required />
      </div>
      <div>
        <label for="labelName">Label Name:</label>
        <input type="text" id="labelName" v-model="labelName" required />
      </div>
      <div>
        <label for="Material">Material:</label>
        <button @click="openMaterialSearch">Search Material</button>
        <input type="text" id="material" v-model="material" required />
      </div>
      <div>
        <label for="width">Width:</label>
        <input type="text" id="width" v-model="width" required />
      </div>
      <div>
        <label for="pitch">Pitch:</label>
        <input type="text" id="pitch" v-model="pitch" required />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
    <div class="success-modal" v-if="searchMaterial">
      <div class="table-container">
        <h2>User List</h2>
        <div class="searchmaterial-menu">
          <input
              type="text"
              v-model="searchQuery"
              @input="filterMaterials"
              placeholder="Search by Material Name"
          />
        </div>
        <table>
          <thead>
          <tr>
            <th>Material Name</th>
            <th>Supplier</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="material in filteredMaterials" :key="material.materialid">
            <td>{{ material.materialname }}</td>
            <td>{{ material.materialsupplier }}</td>
            <td>
              <button @click="pickMaterial(material)">Use</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div><button @click=closeMaterialSearch>Close</button>
    </div>
</template>

<script>
import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
export default {

  components: {
    HeaderBar,
  },

  data() {
    return {
      username: null,
      currentTime: null,
      masterCard: '',
      labelName: '',
      pitch: '',
      width: '',
      material:'',
      searchMaterial: false,
      materialPick: [],
      searchQuery:'',
    };
  },

  computed: {
    filteredMaterials() {
      if (this.searchQuery === '') {
        return this.materialPick;
      } else {
        const query = this.searchQuery.toLowerCase();
        return this.materialPick.filter(material => {
          return material.materialname.toLowerCase().includes(query);
        });
      }
    },
  },


  created() {

    this.fetchMaterials();

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

  methods: {

    pickMaterial(selectedMaterial) {
      this.material = selectedMaterial.materialname; // Set the selected material
      this.searchMaterial = false;
    },

    async fetchMaterials() {
      try {
        const response = await axios.get('/api/getmaterials');
        this.materialPick = response.data;
        console.log(this.materialPick);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    },

    closeMaterialSearch(){
      this.searchMaterial = false;
    },

    openMaterialSearch(){
      this.searchMaterial = true;
    },

    updateCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    redirectTo(path) {
      this.$router.push(path);
    },

    async submitLabel() {
      try {
        const response = await axios.post('/api/submitLabel', {
          labelNumber: this.labelNumber,
          labelName: this.labelName,
          pitch: this.pitch,
          width: this.width,
        });

        if (response.status === 200) {
          console.log('Label submitted successfully');
          // Optionally, you can navigate back to the dashboard or show a success message
        } else {
          console.error('Label submission failed');
        }
      } catch (error) {
        console.error('Error submitting label:', error);
      }
    },

  },
};
</script>

<style scoped>

.searchmaterial-menu {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome {
  text-align: center;
  margin-bottom: 20px;
}

.dashboard-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.dashboard-item {
  margin: 10px;
}
</style>
