const html = 'update or reinstall the script';
const psframe = `<style>
   * {
   box-sizing: border-box;
   }

   html, body{
   margin:0;
   height:99%;
   width: 100%;
   }
   #app {
   font-family:Avenir,Helvetica,Arial,sans-serif;
   -webkit-font-smoothing:antialiased;
   -moz-osx-font-smoothing:grayscale;
   text-align:center;
   color:#2c3e50
   }
   .alert{
      font-weight: bold;
   }
   #list {
   text-align:left;
   list-style:none
   }
   #list h3 {
   margin-bottom:2px
   }
   .modal {
   position:fixed;
   z-index:1;
   height:100%;
   width:100%;
   background:rgba(0,0,0,.5);
   text-align:center
   }
   .modalcontent {
   border-radius:8px;
   background:#fff;
   width:800px;
   margin:150px auto;
   padding:20px
   }
   header {
   background: #f6f8fa;
   width: 100%;
   padding: 20px;
   margin-top:20px;
   }
   .logo {
   position: absolute;
   top: 20px;
   left: 20px;
   font-size: 1.5em;
   margin-left: 1em;
   }
   .cred {
   position: absolute;
   top: 20px;
   right: 20px;
   }
   #tba-input{
   background: #fff;
   border: 1px solid rgba(0,0,0,.2);
   box-shadow: 0 8px 20px rgba(0,0,0,.1);
   border-radius: 8px;
   height: 40px;
   width: 300px;
   font-size: 1.17em;
   text-align: center;
   align-items: center;
   box-sizing: border-box;
   }
   #list h3{
   display: inline-block;
   margin: 5px 5px 5px 0;
   }
   .eagleEye li:first-child {
   border-top: solid 1px #e7e7e7;
   }
   .status, .station, .bug{
   margin: 5px;
   vertical-align: top;
   display: inline-block;
   }
   .status div, .station div, .bug div{
   height: 100%;
   display: inline-block;
   font-size: 12px;
   vertical-align: middle;
   padding: 3px 9px;
   background: #e3e3e3;
   color: #555;
   border-radius: 4px;
   }
   .red div{
   background: rgb(255, 92, 122);
   color: #fff;
   }
   .green div{
   background: #00d1b2;
   color: #fff;
   }
   .yellow div{
   background-color: #ffdd57;
   color: rgba(0,0,0,.7);
   }
   .blue div{
   background-color: #9b9cf0;;
   color: #fff;
   }
   .orange div {
   background-color: #ff7f00;
   color: #fff;
   }
   .pkg-details li {
   list-style: none;
   display: flex;
   align-items: center;
   padding: 20px;
   border-bottom: solid 1px #e7e7e7;
   }
   .pkg-details .count {
   display: inline-block;
   width: 10%;
   text-align: center;
   font-size: 30px;
   }
   .pkg-details .itemName{
   display: inline-block;
   width: 90%;
   }
   .meta {
   font-size: 12px;
   vertical-align: top;
   margin-left: 5px;
   }
   #linkedtbas {
   cursor: pointer;
   }
   .linked-tbas {
   font-family: monospace;
   font-weight: bold;
   color: #6a6a6a;
   position: absolute;
   z-index: 100;
   background: #f6f8fa;
   border: solid 2px #eee;
   padding: 5px;
   }
   .hidden {
   display: none;
   }
   </style>
   <div id="app">
      <header>
         <div class="logo"><strong>PS</strong>Tool</div>
         <input id="tba-input" type="TBA" name="" autofocus="">
         <div class="cred">By Ricardo Arreola (ricaarre)</div>
      </header>
      <section class="container">
         <span class="alert">Latest version now works with EagleEye 2.0, You can get auth key from the eagleeye site by clicking a button on the top left. It resets every 2 hours or so.</span>
         <ul id="list">
         </ul>
      </section>
   </div>
`;
