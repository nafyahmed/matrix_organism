<template>
  <div class="TextEditor">

<ul class="tabs">
  <li class="adding_tab" rel="add" v-on:click="adding_tab">+</li> 
  <li v-for="(value, key, index) in tab_names">{{value}}</li>
</ul>


<div class="tab_container">
 
<!-- load from fb-->


</div>

<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <h4>Leaf Description</h4>
      <input type="text">
    <h4>Leaf Color</h4> 
           <div class="color-wrapper">
          <p>Choose color (# hex)</p>
          <input type="text" name="custom_color" placeholder="#FFFFFF" id="pickcolor" class="call-picker">
          <div class="color-holder call-picker"></div>
          <div class="color-picker" id="color-picker" style="display: none"></div>
        </div>
        <hr>
        <hr>
        <hr>
        <hr>
      <button id='submit_button'>Submit</button>
  </div>


</div>
  </div>
</template>

<script>
  import jQuery from 'jquery/dist/jquery.js'
  import $ from 'jquery/dist/jquery.js'
  import modal from 'bootstrap/dist/css/bootstrap.css'
  import {store} from './store/store.js'
  import * as firebase from 'firebase';


export default {
  name: 'TextEditor',
  props: ['userID'],
  state: {
    auth: ''
  },
  data () {
    return {
      authID  : 'd',
      tab_names : ['tab']
    }
  },

  methods: {  
    adding_tab : function() {
      //console.log("test123");
      //console.log(this.tab_names);
      this.tab_names.push("new tab");
      // update back end  
      this.authID = this.$store.state.auth_id;
      var ref = firebase.app().database().ref();
      var usersRef = ref.child('users');
      var currUser = usersRef.child(this.$store.state.auth_id);
      var tabList = currUser.child('tabs');



    }

  },
  mounted(){
  	var currWord = "";
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    console.log("auth = " + this.$store.state.auth_id);
    this.authID = this.$store.state.auth_id;
    var ref = firebase.app().database().ref();
    var usersRef = ref.child('users');
    var currUser = usersRef.child(this.$store.state.auth_id);
    var tabList = currUser.child('tabs');
    console.log("temp = " + this.tab_names.name)

    //update tab list
      tabList.on('value', function(snapshot){
    snapshot.forEach(function(child){
        var key = child.key;
        var value = child.val();
        console.log("value = " + key);
    });
});

    //set user name
    currUser.set({
        test: {
          one: 0,
          two: 1
        }
    });

    //currUser sets current tabs open



    //check if user exists
    //if user exists, load appropriate data

    //create user



$(".adding_tab").click(function(){
  console.log("clicked");
  //console.log(this.state.auth);

});


$(".active").dblclick(function(){
  console.log("clicked");
   $(this).find('input').removeAttr('readonly');
});

      $('input').keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
          if(keycode == '13'){
            $(this).attr('readonly', 'readonly');
            //update the database
          }

        });

$("#editor").keypress(function(e){
  // console.log($("#editor").text());
   //if current word equals any description in hash description 
   var check = $("#editor").text();
   currWord += String.fromCharCode(e.which);

  // console.log("currWord = " + currWord);


  	/*
  	 * If the user presses space, then we analyze the word the user just typed before resetting the value of current word
  	 */
    if(e.keyCode == 32){
    	/*
		   * If the user types description -> activate this popup
		   */
        if(currWord.indexOf("description") >= 0){
        	console.log("description targetted");
        	var word = $("#editor").text();
        	$("#editor").remove("description");
        	$("#editor").append("<strong>Description:</strong><br>");
        }
    	/*
		   * If the user types leaf, activate this popup
		   */
        if(currWord.indexOf("leaf") >= 0){
        	console.log("description targetted");
        	var word = $("#editor").text();
        	$("#editor").remove("description");
        	$("#editor").append("<strong>Leaf</strong>");
          modal.style.display = "block";
          currWord ="";

        }

        currWord ="";

    }


});


/*
 * Color picker script
 */

    var colorList = [ '000000', '993300', '333300', '003300', '003366', '000066', '333399', '333333', 
'660000', 'FF6633', '666633', '336633', '336666', '0066FF', '666699', '666666', 'CC3333', 'FF9933', '99CC33', '669966', '66CCCC', '3366FF', '663366', '999999', 'CC66FF', 'FFCC33', 'FFFF66', '99FF66', '99CCCC', '66CCFF', '993366', 'CCCCCC', 'FF99CC', 'FFCC99', 'FFFF99', 'CCffCC', 'CCFFff', '99CCFF', 'CC99FF', 'FFFFFF' ];
    var picker = $('#color-picker');

    for (var i = 0; i < colorList.length; i++ ) {
      picker.append('<li class="color-item" data-hex="' + '#' + colorList[i] + '" style="background-color:' + '#' + colorList[i] + ';"></li>');
    }

    $('body').click(function () {
      picker.fadeOut();
    });

    $('.call-picker').click(function(event) {
      event.stopPropagation();
      picker.fadeIn();
      picker.children('li').hover(function() {
        var codeHex = $(this).data('hex');

        $('.color-holder').css('background-color', codeHex);
        $('#pickcolor').val(codeHex);
      });
    });





     // tabbed content
    // http://www.entheosweb.com/tutorials/css/tabs.asp
    $(".tab_content").hide();
    $(".tab_content:first").show();

  /* if in tab mode */
    $("ul.tabs li").click(function() {
    
      $(".tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();    
    
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
    
    });
  /* if in drawer mode */
  $(".tab_drawer_heading").click(function() {
      
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
    
    $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
    
    $("ul.tabs li").removeClass("active");
    $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
  
  
  /* Extra class "tab_last" 
     to add border to right side
     of last tab */
  $('ul.tabs li').last().addClass("tab_last");
  


  }
}

</script>

<style scoped>
body {
   background: #525764;
   font-family: Arial, sans-serif;
   font-size: 16px;
}

.wrap {
   width: 70%;
   min-width: 562px;
   margin-left: 10%;
   background: #fafafa;
   border-radius: 8px;
   box-shadow: 0 5px 8px 0 rgba(0,0,0,.4);
   padding: 10px;
}

.toolbar {
   width: 100%;
   margin: 0 auto 10px;
}

button {
   width: 30px;
   height: 30px;
   border-radius: 3px;
   background: none;
   border: none;
   box-sizing: border-box;
   padding: 0;
   font-size: 20px;
   color: #a6a6a6;
   cursor: pointer;
   outline: none;
}

button:hover {
   border: 1px solid #a6a6a6;
   color: #777;
}

#bold,
#italic,
#underline {
   font-size: 18px;
}

#underline,
#align-right {
   margin-right: 17px;
}

#align-left {
   margin-left: 17px;
}

select {
   height: 24px;
   font-size: 15px;
   font-weight: bold;
   color: #444;
   background: #fcfcfc;
   border: 1px solid #a6a6a6;
   border-radius: 3px;
   margin: 0;
   outline: none;
   cursor: pointer;
}

select > option {
   font-size: 15px;
   background: #fafafa;
}

#fonts {
   width: 140px;
}

.sp-replacer {
   background: #fcfcfc;
   padding: 1px 2px 1px 3px;
   border-radius: 3px;
   border-color: #a6a6a6;
   margin-top: -1px;
}

.sp-replacer:hover {
   border-color: #a6a6a6;
   color: inherit;
}

.sp-preview {
   width: 15px;
   height: 15px;
   border: none;
   margin-top: 2px;
   margin-right: 3px;
}

.sp-preview-inner, 
.sp-alpha-inner, 
.sp-thumb-inner {
   border-radius: 3px;
}

.editor {
   position: relative;
   width: 100%;
   height: 60vh;
   margin: 0 auto;
   padding: 20px;
   background: #fcfcfc;
   border-radius: 3px;
   box-shadow: inset 0 0 8px 1px rgba(0,0,0,.2);
   box-sizing: border-box;
   overflow: hidden;
   word-break: break-all;
   outline: none;
}
  ul.tabs {
  margin: 0;
  padding: 0;
  float: left;
  list-style: none;
  height: 32px;
  border-bottom: 1px solid #333;
  width: 100%;
}

ul.tabs li {
  float: left;
  margin: 0;
  cursor: pointer;
  padding: 0px 21px;
  height: 31px;
  line-height: 31px;
  border-top: 1px solid #333;
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
  background-color: #666;
  color: #ccc;
  overflow: hidden;
  position: relative;
}

.tab_last { border-right: 1px solid #333; }

ul.tabs li:hover {
  background-color: #ccc;
  color: #333;
}

ul.tabs li.active {
  background-color: #fff;
  color: #333;
  border-bottom: 1px solid #fff;
  display: block;
}

.tab_container {
  border: 1px solid #333;
  border-top: none;
  clear: both;
  float: left;
  width: 100%;
  background: #fff;
  overflow: auto;
}

.tab_content {
  padding: 20px;
  display: none;
}

.tab_drawer_heading { display: none; }

@media screen and (max-width: 480px) {
  .tabs {
    display: none;
  }
  .tab_drawer_heading {
    background-color: #ccc;
    color: #fff;
    border-top: 1px solid #333;
    margin: 0;
    padding: 5px 20px;
    display: block;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .d_active {
    background-color: #666;
    color: #fff;
  }
}


input{
  background-color: black;
  color: white;
  text-align: center;
  outline: none;
    box-shadow: none;

}

.the_submit{
  background-color: black;
  float: right;
  color: white;
  width: 100px;
  margin-bottom: 10px;
  margin-right: 80px;
}


.text_input{
  cursor: pointer;
}

</style>
