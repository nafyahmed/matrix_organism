<template>

  <div id="app" style="width: 1500px">
     <div id='matrix_element' style="width: 750px; float: left">
    <Matrix></Matrix>
  </div>
  <div id='text_editor' style="width: 750px; float: right">
    <TextEditor></TextEditor>
  </div>
  <hr> 
<!--   <label>Name</label>
  <input type="text" v-model="name" />
  <button @click="submitName()">Add</button> -->
  <div>
    <table>
      <!-- make table format -->
      <tr v-for="personName of names" v-bind:key="personName['.key']">
        {{personName.name}}
      </tr>
    </table>
  </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script>
import TextEditor from './components/TextEditor'
import Matrix from './components/Matrix'
  import jQuery from 'jquery/dist/jquery.js'
  import $ from 'jquery/dist/jquery.js'
  import modal from 'bootstrap/dist/css/bootstrap.css'
import {nodesRef} from './firebase';


export default {
  data(){
    return{
      name: 'Paul'
    }
  },
  firebase: {
    names: nodesRef
  },
  methods: {
    submitName(){
      nodesRef.push({name: this.name})
    }
  },
  name: 'App',
  components: {
    TextEditor, Matrix
  },
    mounted(){

  }
}
</script>

<style>
body {
  background-color: #007bff;
}
td{
  background-color: white;
}
#matrix_element{
  background-color: black;
}

</style>
