const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let items = ["have breakfast","take woke"];
let workItems = [];
app.get("/",function(req,res){
  let today = new Date();
  let option = {
      month:"long",
    weekday:"long",


  };
  let day = today.toLocaleDateString("en-US",option);
  res.render("list",{listTitle:day , newItems:items});

});

app.post("/",function(req,res){
  let item = req.body.input;
  console.log(req.body)
if(req.body.list === "Work List"){
  workItems.push(item);
  res.redirect("/work");
}
else{
  items.push(item);
  res.redirect("/");
}

});
app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work List" , newItems:workItems});
});

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000,function(){
  console.log("this server is running in port 3000")
});
