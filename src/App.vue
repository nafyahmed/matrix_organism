<template>

  <div id="app">

    <div id="login" v-if="sign_in">
      <div id="loginMenu" className="container">
        <div className="row" id="loginMenu2">
            <div className="col-md-4"></div>
            <div className="col-md-4 login-box">
                <div className="col-lg-12 login-key">
                    <i className="fa fa-key"></i>
                </div>
                <div className="col-lg-12 login-title">
                </div>
                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <input id="txtEmail" className="form-control" type="email" placeholder = "Email"></input>
                        <input id="txtPassword" className="form-control" type="password" placeholder="Password"></input>
                    </div>
                    <div className="col-lg-12 loginbttm">
                        <div className="col-lg-12 login-btm login-text">
                        </div>
                        <div className="col-lg-12 login-btm login-button">
                            <button id="btnLogin" className="btn btn-outline-primary" @click="login()">Login</button>
                            <button id="btnSignUp" className="btn btn-outline-primary" onClick={this.signup}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
 </div>

    <div id="content" v-if="logged_in">
       <div id='matrix_element' style="width: 750px; float: left">
      <Matrix></Matrix>
    </div>
    <div id='text_editor' style="width: 750px; float: right">
      <TextEditor></TextEditor>
    </div>
</div>
  <hr> 
<!--   <label>Name</label>
  <input type="text" v-model="name" />
  <button @click="submitName()">Add</button> -->
  <div>
<!--     <table>
      <tr v-for="personName of names" v-bind:key="personName['.key']">
        {{personName.name}}
      </tr>
    </table> -->
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
import Login from './components/Login'
  import jQuery from 'jquery/dist/jquery.js'
  import $ from 'jquery/dist/jquery.js'
  import modal from 'bootstrap/dist/css/bootstrap.css'
import {nodesRef} from './firebase';


export default {
  data(){
    return{
      name: 'Paul',
      logged_in: false,
      sign_in: true
    }
  },
  firebase: {
    names: nodesRef
  },
  methods: {
    submitName(){
      nodesRef.push({name: this.name})
    },
    login(){
      /*
       * add firebase db authentication
       */
      this.sign_in = false;
      this.logged_in = true;
    }
  },
  name: 'App',
  components: {
    TextEditor, Matrix, Login
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
