<template>
  <div class="TextEditor">

<ul class="tabs">
  <li class="active" rel="tab1">Tab 1</li>
  <li rel="tab2">Tab 2</li>
  <li rel="tab3">Tab 3</li>
  <li rel="tab4">Tab 4</li>
  <li rel="tab5">+</li> 
</ul>


<div class="tab_container">
 
 <!-- Tab 1 -->
  <div id="tab1" class="tab_content">
    <div class="wrap">
   <div class="editor" id="editor" contenteditable></div>
  </div>
</div>


<!-- Tab 2 -->
  <h3 class="tab_drawer_heading" id="one" rel="tab2">Tab 2</h3>
  <div id="tab2" class="tab_content">
    <div class="wrap">
       <div class="editor" id="editor" contenteditable></div>
    </div>
  </div>

<!-- Tab 3 -->
  <h3 class="tab_drawer_heading" rel="tab3">Tab 3</h3>
  <div id="tab3" class="tab_content">
    <div class="wrap">
       <div class="editor" id="editor" contenteditable></div>
    </div>
  </div>

  <!-- Tab 4 -->
  <h3 class="tab_drawer_heading" rel="tab4">Tab 4</h3>
  <div id="tab4" class="tab_content">
    <div class="wrap">
       <div class="editor" id="editor" contenteditable></div>
    </div>
  </div>
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
export default {
  name: 'TextEditor',
  data () {
    return {
    }
  },
  mounted(){
  	var currWord = "";

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


$("li").click(function(){
  
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
   font-family: Arial, sans-serif;
   font-size: 16px;
}

.wrap {
	position: relative;
   width: 100%;
   background: #fafafa;
/*   border-radius: 8px;
*/   box-shadow: 0 5px 8px 0 rgba(0,0,0,.4);
   padding: 10px;
   float:right;
  /* top: -55px;*/

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



select {
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
}

.sp-preview-inner, 
.sp-alpha-inner, 
.sp-thumb-inner {
   border-radius: 3px;
}

.editor {
   width: 100%;
   height: 210px;
   padding: 20px;
   background: #fcfcfc;
   border-radius: 3px;
   box-shadow: inset 0 0 8px 1px rgba(0,0,0,.2);
   box-sizing: border-box;
   overflow: hidden;
   word-break: break-all;
   outline: none;
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}


  .color-wrapper {
    position: relative;
    width: 600px;
    margin: 20px auto;
    float: left;
  }

  .color-wrapper p {
    margin-bottom: 5px;
  }

  input.call-picker {
    border: 1px solid #AAA;
    color: #666;
    text-transform: uppercase;
    float: left;    
    outline: none;
    padding: 10px;
    text-transform: uppercase;
    width: 85px;
  }

  .color-picker {
    width: 500px;
    background: #F3F3F3;
    height: 81px;
    padding: 5px;
    border: 5px solid #fff;
    box-shadow: 0px 0px 3px 1px #DDD;
    position: absolute;
    top: 61px;
    left: 2px;
  }

  .color-holder {
    background: #fff;
    cursor: pointer;
    border: 1px solid #AAA;
    width: 40px;
    height: 36px;
    float: left;
    margin-left: 5px;
  }

  .color-picker .color-item {
  
    cursor: pointer;
    width: 10px;
    height: 10px;
    list-style-type: none;
    float: left;
    margin: 2px;
    border: 1px solid #DDD;
    list-style-type: none;
  }

  #color-picker li{
    float: left;
  }

  .color-picker .color-item:hover {
    border: 1px solid #666;
    opacity: 0.8;
    -moz-opacity: 0.8;
    filter:alpha(opacity=8);
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





</style>
