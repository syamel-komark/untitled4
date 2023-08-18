<template>
  <h2>ECS Label Specification<label for="costingnumber">Costing Number:</label>
    <input type="text" id="costingnumber" v-model="newCostingId" required readonly/></h2>
  <div class="form-container">
    <div class="form-group">
      <label for="Mastercard">Mastercard:</label>
      <input type="text" id="Mastercard" v-model="formModel.mastercard" required readonly/>
    </div>
    <div class="form-group">
      <label for="labelName">Label Name:</label>
      <input type="text" id="labelName" v-model="formModel.labelName" required readonly/>
    </div>
    <div class="form-group">
      <label for="Pitch">Label Pitch:</label>
      <input type="text" id="Pitch" v-model="formModel.pitch" required readonly/>
    </div>
    <div class="form-group">
      <label for="number">Label Width:</label>
      <input type="text" id="Width" v-model="formModel.width" required readonly/>
    </div>
    <div class="form-group">
      <label for="Material">Material:</label>
      <input type="text" id="Material" v-model="formModel.material" required readonly/>
    </div>
    <div class="form-group">
      <label for="number">Label No of Color:</label>
      <input type="number" id="Color" v-model="formModel.color" required readonly/>
    </div>
    <div class="form-group">
      <label for="across">Label Across:</label>
      <input type="number" id="across" v-model="formModel.across" required readonly/>
    </div>
    <div class="form-group">
      <label for="around">Label Around:</label>
      <input type="number" id="around" v-model="formModel.around" required readonly/><label for="Gear">Gear:</label><input type="text" id="gear" v-model="formModel.gear" required readonly/>
    </div>
    <div class="form-group">
      <label for="process">Label Process:</label>
      <input type="text" id="process" v-model="selectedProcess" required readonly/>
    </div>
    <div class="form-group">
      <label for="finishing">Label Finishing:</label>
      <input type="text" id="finishing" v-model="selectedFinishing" required readonly/>
    </div>
    <div class="form-group">
      <label for="quantity">Quantity Ordered:</label>
      <input type="text" id="quantity" placeholder="Key in quantity to quote (use ; for multiple moq)" @input="getMoq" v-model="quantity" required />
    </div>
    <div class="form-group">
      <label for="printing length total">Label printing length total:</label>
      <input type="text" id="finishing" v-model="calculatePrintingLengthTotal" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing gap">Label gap:</label>
      <input type="text" id="finishing" v-model="calculateGap" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Label printing length:</label>
      <input type="text" id="finishing" v-model="calculatePrintingLength" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Label wastage:</label>
      <input type="text" id="finishing" v-model="wastage" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Label color setting length:</label>
      <input type="text" id="finishing" v-model="calculateSettingLengthColor" required />
    </div>
    <div class="form-group">
      <label for="printing length">ink cost:</label>
      <input type="text" id="finishing" v-model="calculateInkCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Label joints setting length:</label>
      <input type="text" id="finishing" v-model="calculateJointLengthWastage" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">material width:</label>
      <input type="text" id="finishing" v-model="calculateMaterialWidth" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">varnish cost:</label>
      <input type="text" id="finishing" v-model="calculateVarnishCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">material price:</label>
      <input type="text" id="finishing" v-model="formModel.materialPrice" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">paper cost:</label>
      <input type="text" id="finishing" v-model="calculatePaperMaterialPrice" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">plate cost:</label>
      <input type="text" id="finishing" v-model="calculatePlatePrice" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">diecut cost:</label>
      <input type="text" id="finishing" v-model="calculateDieCut" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">fixed cost:</label>
      <input type="text" id="finishing" v-model="calculateFixedCosts" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">total tooling cost:</label>
      <input type="text" id="finishing" v-model="totalToolingCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">sum material</label>
      <input type="text" id="finishing" v-model="sumMaterial" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">sum Cost:</label>
      <input type="text" id="finishing"  v-model="sumCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Unit Cost:</label>
      <input type="text" id="finishing"  v-model="unitCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">margin:</label>
      <input type="text" id="finishing" @input="setMargin" v-model="margin" required/>
    </div>
    <div class="form-group">
      <label for="printing length">RSP:</label>
      <input type="text" id="finishing"  v-model="RSP" required readonly/>
    </div>


  </div>
  <div class="form-container">
    <div class="form-group">
    </div>
    <div class="form-group">
      <button @click="runAsyncFunctions" id="registercosting">Next</button>
  </div>
  </div>





</template>

<script>
//import axios from "axios";
//import HeaderBar from "@/components/AppHeader.vue";
//import axios from "axios";

export default {

  components: {
    //HeaderBar,
  },

  data() {
    return {
      margin: 0.7,
      wastage:1.05,
      selectedFinishing:'',
      selectedProcess:'',
      gap:'',
      printingLength:[],
      quantity:'',
      moq:[],
      newCostingId:"",
      machine: 'ECS',
      username: null,
      currentTime: null,
      input:{
        settingLength:0,
      },
      formModel:{
        mastercard: '',
        labelName:'',
        across:'',
        around:'',
        material:'',
        color:'',
        pitch:'',
        width:'',
        gear:'',
        materialPrice:'',
      },
      fixedCost:{
        ECS340: 0.05219,
        AVTInspection: 0.0261 ,
        AutoCut: 0.0261,
        numberingMachine:0.0261,
        kopack13: 0.0261,
        sonata:0.01,
        iwasaki:0.0261,
        gallus4:0.01,
        bagMaking:0.005,
        gravureSlitting:0.0261,
        gravurePrinting:0.0052,
        lamination:0.0052,
        utecoPrinting:0.0418,
        utecoSlitting:0.0261,
        packing:0.01,
        EM280:0.0261,
        rhyguan:0.0261,
        digital:0.0522,
        k1Printing:0.021,
        k1Slitting:0.0261,


      },
    };
  },

  computed: {

    getMargin(){
      return this.margin ;

    },

    RSP(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const toolingCost = this.totalToolingCost;
        const total = paperCost+varnishCost+inkCost+fixedCost+toolingCost;
        sum.push(total/this.moq[i]/this.margin);
      }
      return sum;
    },


    unitCost(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const toolingCost = this.totalToolingCost;
        const total = paperCost+varnishCost+inkCost+fixedCost+toolingCost;
        sum.push(total/this.moq[i]);
      }
      return sum;
    },

    sumCost(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const toolingCost = this.totalToolingCost;
        const total = paperCost+varnishCost+inkCost+fixedCost+toolingCost;
        sum.push(total);
      }
      return sum;
    },

    sumMaterial(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const total = paperCost+varnishCost+inkCost+fixedCost;
        sum.push(total);
      }
      return sum;
    },

    totalToolingCost(){
      const sum = this.calculatePlatePrice + this.calculateDieCut;
      return sum;
    },


    //i dont even know how this part works
    calculateFixedCosts() {
      const fixedCostRates = {
        ECS340: 0.05219,
        AVTInspection: 0.0261 ,
        AutoCut: 0.0261,
        numberingMachine:0.0261,
        kopack13: 0.0261,
        sonata:0.01,
        iwasaki:0.0261,
        gallus4:0.01,
        bagMaking:0.005,
        gravureSlitting:0.0261,
        gravurePrinting:0.0052,
        lamination:0.0052,
        utecoPrinting:0.0418,
        utecoSlitting:0.0261,
        packing:0.01,
        EM280:0.0261,
        rhyguan:0.0261,
        digital:0.0522,
        k1Printing:0.021,
        k1Slitting:0.0261,
        // Add more process names and rates as needed
      };
      const processes = this.selectedProcess.split(','); // Split the string into an array
      const fixedCosts = processes.map(process => fixedCostRates[process] || 0); //maps fixed cost
      const totalFixedCosts = []; //intialize for fixed cost matrix

      for (let i = 0; i < this.calculatePrintingLengthTotal.length; i++) {//sets loop parameter to go through each length
        let currentLength = this.calculatePrintingLengthTotal[i];
        let lengthFixedCosts = 0;//initialize for summing fixed cost for length

        for (let j = 0; j < fixedCosts.length; j++) {//loops through the process of length
          const fixedCost = fixedCosts[j];//calls the first process fixed cost
          lengthFixedCosts += fixedCost * currentLength;//sums the whole process of fixedcost x length
        }

        totalFixedCosts.push(lengthFixedCosts); //push each fixed cost to respective length
      }

      return totalFixedCosts;




    },


    calculateDieCut(){
      if(this.calculateMaterialWidth>220){
        return 1300;
      }
      else{
        return 800
      }
    },

    calculatePlatePrice(){
      let color = this.formModel.color;
      let platePrice = 1861.39; //rm/m2
      let length = parseFloat(this.formModel.pitch/1000); //m
      let width = parseFloat(this.formModel.width/1000); //m
      //let gap = parseFloat(this.calculateGap)/1000;
      let plateArea =  length * width * this.formModel.around * this.formModel.across*1.1;
      let plateCost = plateArea * platePrice * color;
      return parseFloat(plateCost.toFixed(2));

    },

    calculateGap(){
      let gap =null;
      gap = (this.formModel.gear*3.157/this.formModel.around) - this.formModel.pitch;
      return parseFloat(gap.toFixed(3));
    },

    calculatePrintingLengthTotal(){
      let printLength=null;
      printLength=this.moq.map(moq => moq *
          (((parseInt(this.formModel.pitch)+parseInt(this.calculateGap))/this.formModel.across)/1000)
          * this.wastage
          +parseInt(this.calculateSettingLengthColor)
          +parseInt(this.calculateJointLengthWastage)

      );
      return printLength;
    },

    calculatePrintingLength(){
      let printLength=null;
      printLength=this.moq.map(moq => moq *
          (((parseInt(this.formModel.pitch)+parseInt(this.calculateGap))/this.formModel.across)/1000)
          );
      return printLength;
    },

    calculateSettingLengthColor(){
      if(this.formModel.color > 4){
        let settingLengthColor = 1000;
        return settingLengthColor;
      }
      else {
        return 500;
      }
    },

    calculateJointLengthWastage(){
      let jointLength=null;
      let rollLength = 2000;
      let jointWastage = 20;
      let printLength = this.moq.map(moq => moq *
          (((parseFloat(this.formModel.pitch)+parseFloat(this.calculateGap))/this.formModel.across)/1000)
      );
      let numberOfJoints = printLength.map(print=> Math.floor(print / rollLength));
      jointLength = numberOfJoints.map(joint => Math.round(joint * jointWastage));
      return jointLength;
    },

    calculateMaterialWidth(){
      let matWidth = null;
      matWidth = this.formModel.across * ((3)+parseInt(this.formModel.width))-(3)+(15);
      return matWidth;
    },

    calculateInkCost(){
      let printLength = this.calculatePrintingLengthTotal;
      let materialWidth = this.calculateMaterialWidth/1000;
      let inkCost = 0.15; //rm/g
      let color = this.formModel.color;
      let coatingWeight = 0.4; //g/m2
      let inkUse = printLength.map(length=> length*materialWidth*inkCost*color*coatingWeight);
      return inkUse.map((value) => parseFloat(value.toFixed(2)));

    },

    calculateVarnishCost(){
      let printLength = this.calculatePrintingLengthTotal;
      let materialWidth = this.calculateMaterialWidth/1000;
      let finishingArray = this.selectedFinishing.split(','); // Convert the string to an array
      let varnishCount = finishingArray.filter(item => item.trim() === 'Varnish').length;
      let varnishCost = 0.08; //rm/g
      let coatingWeight = 0.4; //g/m2
      let varnishUse = printLength.map(length=> length*materialWidth*varnishCost*varnishCount*coatingWeight);
      return varnishUse.map((value) => parseFloat(value.toFixed(2)));
      },

    ///laminate need to be looked into. possible to make a maintainable table

    calculateGlossLaminateCost(){
      let printLength = this.calculatePrintingLengthTotal;
      let materialWidth = this.calculateMaterialWidth/1000;
      let finishingArray = this.selectedFinishing.split(','); // Convert the string to an array
      let varnishCount = finishingArray.filter(item => item.trim() === 'glossLaminate').length;
      let varnishCost = 0.08; //rm/g
      let coatingWeight = 0.4; //g/m2
      let varnishUse = printLength.map(length=> length*materialWidth*varnishCost*varnishCount*coatingWeight);
      return varnishUse.map((value) => parseFloat(value.toFixed(2)));
    },

    calculatePaperMaterialPrice(){
      let price = this.formModel.materialPrice;
      let printLength = this.calculatePrintingLengthTotal;
      let materialWidth = this.calculateMaterialWidth/1000;
      let paperUse = printLength.map(length=> length*materialWidth*price);
      return paperUse.map((value)=> parseFloat(value.toFixed(2)));

    },




  },


  created() {

    this.getMoq();

    this.getInfo();


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

    setMargin(){
      this.margin = this.getMargin;
    },


    storeValue(){
      this.gap=this.calculateGap;
      this.printingLength=this.calculatePrintingLength;
    },


    getMoq() {
      if (this.quantity) {
        // Split the input string by ';'
        const quantities = this.quantity.split(';').map(qty => qty.trim());

        // Convert each quantity to a number and store in the moq array
        this.moq = quantities.map(qty => parseInt(qty, 10));
      } else {
        this.moq = []; // Clear the moq array if no input
      }

    },

    getInfo(){
      this.formModel.mastercard = sessionStorage.getItem('mastercard');
      this.formModel.labelName = sessionStorage.getItem('labelname');
      this.formModel.pitch = sessionStorage.getItem('pitch');
      this.formModel.width = sessionStorage.getItem('width');
      this.formModel.material = sessionStorage.getItem('material');
      this.formModel.color = sessionStorage.getItem('color');
      this.formModel.across = sessionStorage.getItem('across');
      this.formModel.around = sessionStorage.getItem('around');
      this.formModel.gear = sessionStorage.getItem('gear');
      this.selectedProcess = sessionStorage.getItem('process');
      this.selectedFinishing = sessionStorage.getItem('finishing');
      this.newCostingId = sessionStorage.getItem('costingnumber');
      this.formModel.materialPrice = sessionStorage.getItem('materialprice');

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

.form-container {
  display: flex;
  flex-wrap: wrap;
}

.form-group {
  flex: 0 0 calc(50% - 20px); /* Adjust the width as needed */
  margin-right: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
