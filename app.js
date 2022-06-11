const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require('mongoose');
const app= express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://lsawai:2qpgD0JVOizLxshy@cluster0.fflnf.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true,
useUnifiedTopology: true,
  })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

//Schema for storing the information
const aadharSchema= new mongoose.Schema({
    Name: String,
    Aadhar_id: Number,
    Age:Number
});

const Aadhar_card=mongoose.model('aadhar',aadharSchema);

app.get("/",function(req,res){
    res.render("main");
});

//Postdetails for storing details
app.post("/postDetails",function(req,res){
    const A_name= req.body.Name;
    const A_no= req.body.AadharNo;
    const A_age=req.body.Age;
    const Aadhar= new Aadhar_card({
        
            Name: A_name,
            Aadhar_id: A_no,
            Age: A_age
        
    });
    console.log(Aadhar);
    Aadhar.save();
    res.render("success");
})

//Getdetails for showing all the entries
app.get("/getDetails",function(req,res){
    
    Aadhar_card.find(function(err,results){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.render("list",{Aadharitems:results});
        }
    })
})
app.listen(8080,function(){
    console.log("Server running on port 8080");
})