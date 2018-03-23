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
                        <div id="txtResult"></div>
                        <input id="txtEmail" className="form-control" type="email" placeholder = "Email"></input>
                        <br>
                        <input id="txtPassword" className="form-control" type="password" placeholder="Password"></input>
                    </div>
                    <div className="col-lg-12 loginbttm">
                        <div className="col-lg-12 login-btm login-text">
                        </div>
                        <div className="col-lg-12 login-btm login-button">
                            <button id="btnLogin" className="btn btn-outline-primary" @click="login()">Login</button>
                            <button id="btnSignUp" className="btn btn-outline-primary" @click="signup()">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
 </div>

    <div id="content" v-if="logged_in">
                     <div id="matrix_header" style="text-align: center; background-color: black; font-size: 15px; width: 50%; float: left; color: white;">Organism Matrix</div>
                            <div id="text_editor_header" style="text-align: center; background-color: black; font-size: 15px; width: 50%; float: right; color: white;">Text Editor</div>

       <div id='matrix_element' style=" float: left;">

      <Matrix></Matrix>
    </div>
    <div id='text_editor' style="width: 710px; float: right; margin-right: 10px; ">
      <TextEditor></TextEditor>
    </div>
    <div class="vr"></div>

</div>
<!--   <label>Name</label>
  <input type="text" v-model="name" />
  <button @click="submitName()">Add</button> -->
<!--   <div>
    <table>
      <tr v-for="personName of names" v-bind:key="personName['.key']">
        {{personName.name}}
      </tr>
    </table>
  </div> -->
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
import * as firebase from 'firebase';


export default {
  data(){
    return{
      name: 'Paul',
      logged_in: true,
      sign_in: false,
      email: '',
      password: ''
    }
  },
/*  firebase: {
    names: nodesRef
  },*/
  methods: {
    submitName(){
      nodesRef.push({name: this.name})
    },
    login(){
      /*
       * add firebase db authentication
       */

        const email = txtEmail.value.toString();
        console.log("email = " + email);
        const pass = txtPassword.value.toString();
        console.log("pass = " + pass);
        const auth = firebase.auth();
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass).then(
            user => {
              this.logged_in = true;
              this.sign_in = false;
            },
          )
        .catch(
          error => {
            console.log("error");
            $("#txtResult").empty();
            $("#txtResult").append("Error logging in");

            return;
          });


    },
    signup(){
        const email = txtEmail.value.toString();
        console.log("email = " + email);
        const pass = txtPassword.value.toString();
        console.log("pass = " + pass);
        const auth = firebase.auth();
        var val = 0;
        const promise = firebase.auth().createUserWithEmailAndPassword(email, pass).then(
            user => {
              const newUser = {
                id: user.uid,
                registerMeetUps: []
              }
              this.logged_in = true;
              this.sign_in = false;
            },
          )
        .catch(
          error => {
            console.log("error");
            $("#txtResult").empty();
            $("#txtResult").append("Error Signing up");
            val = 1;
            return;
          });

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
  background-image: url("background2.jpg");

  background-color: #007bff;
}
td{
  background-color: white;
}
#matrix_element{
  background-color: black;
}


#txtEmail {
    margin-top: 75px;
    height: auto;
    background: white;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}


.login-key {
    height: 100px;
    font-size: 80px;
    line-height: 100px;
    background: -webkit-linear-gradient(#27EF9F, #0DB8DE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.login-title {
    margin-top: 15px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    margin-top: 15px;
    font-weight: bold;
    /*color: #6C6C6C;*/
    color: #333;
}

.login-form {
    margin-top: 25px;
    text-align: left;
}

input[type=email] {
    background-color: white;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: black;
}

input[type=password] {
    background-color: white;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    padding-left: 0px;
    margin-bottom: 20px;
    color: black;
}

input#email, input#password {
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-radius: 0px;
    box-shadow: none;
}

.form-group {
    margin-bottom: 40px;
    outline: 0px;
}

.form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 2px solid #0DB8DE;
    outline: 0;
    background-color: #1A2226;
    color: black;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0;
}


label {
    margin-bottom: 0px;
    font-size: 13px !important;
}

.form-control-label {
    text-align: center;
    font-size: 10px;
    color: #6C6C6C;
    font-weight: 500;
    letter-spacing: 1px;
}

.btn-outline-primary {
    border-color: #002663;
    color: #002663;
    border-radius: 0px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-primary:hover {
    background-color: #002663;
    color: black;
    right: 0px;
}

.login-btm {
    float: left;
}

.login-button {
    padding-right: 0px;
    text-align: right;
    margin-bottom: 25px;
}


.login-text {
    text-align: left;
    padding-left: 0px;
    color: #A2A4A4;
}

.loginbttm {
    padding: 0px;
}

#txtEmail{
  width: 300px;
  height: 30px;
  position: relative;
  left: 40%;
}
#txtPassword{
  width: 300px;
  height: 30px;
  text-align: center;
    position: relative;
  left: 40%;
}

#btnSignUp{
      position: relative;
  left: 40%;
}

#btnLogin{
      position: relative;
  left: 40%;
}

#txtResult{
 position: absolute;
 left: 40%;
 top: 80px;
}

.vr{
  position: relative;
    width:1px;
  display:table-cell;
  background-color:black;
  height: 1000px;
  float: right;
  margin-right: 150px;
}
</style>
