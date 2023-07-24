const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash")
const path= require("path")
require('dotenv').config()
//console.log(require('dotenv').config() )
//console.log(date.getday()); {path:'/.env'}
const pwd=process.env.MONGO_PWD
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//if(process.env.NODE_ENV==='Production'){
    
  console.log("prod mode");
    mongoose.connect(`mongodb+srv://testproj:${pwd}@cluster0.gb5y2fq.mongodb.net/todlistdb`);
//}else {

  //console.log("dev mode");
  //mongoose.connect("mongodb://0.0.0.0:27017/todlistdb");
//}


const listschema = new mongoose.Schema({
  name: String,
});

const List = new mongoose.model("List", listschema);

const first = new List({
  name: "games",
});
const second = new List({
  name: "eggs",
});
const third = new List({
  name: "ham",
});

var x = [first, second, third];
/////////////////
const newlist = new mongoose.Schema({
  name: String,
  item: [listschema],
});

const Item = new mongoose.model("Item", newlist);
///////////
var namelist;
var day2= date.getday();
var y = [];

app.get("/", function (req, res) {
  
  // var day1;
  //  var day2;
  // var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  // if(day.getDay()===6 || day.getDay()===0)
  // {
  // day1=day.getDay()
  // day2=days[day1]

  // }else{

  //     day1=day.getDay()
  // day2=days[day1]
  // }

  async function f(err) {
    if (err) {
      console.log(err);
    } else {
      const r = await List.find({});
      console.log(r);
      if (r.length === 0) {
        List.insertMany(x);
        console.log("new items added");
        res.redirect("/"); // redirect to the get route which is the "list.ejs" in else block
      } else if (r.length > 0) {
        //console.log(r);
        res.render("list", { someday: day2, test: r });
      }
    }
  }

  f();
});

app.post("/", function (req, res) {
  const x = req.body.t1;
  const n = req.body.button;
  console.log(n);
  const newitem = new List({
    name: x,
  });
 ////pwd: FojawZoZN4Zt6GK1
 /// user: testproj
  if (n===day2) {
   
   
    newitem.save();
    // x.push(namelist)  // adding to x array
    res.redirect("/");
  } else {
    async function f(err) {
      if (err) {
        console.log(err);
      } else {
        const r = await Item.findOne({ name: n });
        r.item.push(newitem);
        r.save();
        res.redirect(`/${n}`);
      }
    }
f()
   
    
  }


  // if(req.body.button==="Work"){

  //     namelist= req.body.t1 //input what i am typing
  //     y.push(namelist)   // adding to empty array of y
  //     res.redirect("/work")  //get request route /work

  // }else{

  //}

  //console.log(name);
  //res.render("list",{test:name})
});

app.post("/delete", (req, res) => {
  var del = req.body.ischecked;
  const i= req.body.newlist
  console.log("name is",i);
//  console.log(del);

  if(i===day2){
    async function de(err) {
        if (err) {
          console.log(err);
        } else {
          await List.deleteOne({ name: del });
          res.redirect("/");
        }
      }
      de();
  }else{

    async function li(err) {

        if(err){
            console.log(err);
        }else{

           //await Item.updateOne({name:i},{$pull:{item:{name:del}}})
           await Item.findOneAndUpdate({name:i},{$pull:{item:{name:del}}})

            res.redirect(`/${i}`)
        }
        
    }
    li()
  }

});


app.get("/:customlist", function (req, res) {
  const s = _.capitalize(req.params.customlist);
 
  //const d =lodash.upperFirst(s)
  //or
  //const f=s[0].toUpperCase()+s.slice(1,s.length).toLocaleLowerCase()
  
  async function l(err) {
    if (err) {
      console.log(err);
    } else {
      const r = await Item.findOne({ name: s });

      if (!r) {
        const first = new Item({
          name: s,
          item: x,
        });

        async function w(err) {
            if(!err){
                await Item.insertMany(first)
            }else{
                console.log(err);
            }
        }
        w()
        res.redirect(`/${s}`);
      } else {
        res.render("list", { someday: s, test: r.item });
      }
 
    }
  }
  l();


  //res.render("list",{someday:s,test:y})
});

app.get("/about", function (req, res) {
  res.render("aboutme");
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
