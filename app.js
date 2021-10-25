var cookieParser          = require('cookie-parser');
var csrf                  = require('csurf');
var bodyParser            = require("body-parser");
var express               = require("express");
var mongoose              = require("mongoose");
var xss 				  = require('xss');
//var hello = ("<script>");
//var html = xss(hello);
//console.log(html);

// var passport              = require("passport"),
// var LocalStrategy         = require("passport-local"),
// var passportLocalMongoose = require("passport-local-mongoose")
var User                  = require("./models/user");
var epressSanitizer       = require("express-sanitizer");
var exec                  = require('child_process').exec;
const multer              = require('multer');
const path                = require('path');
mongoose.connect("mongodb://localhost:27017/attck", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
var app = express();
var csrfProtection = csrf();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("images"));
app.use(epressSanitizer());
app.use(cookieParser());
app.use(require("express-session")({
 secret: "Command Execution is the best attack",
 resave: false,
 saveUninitialized: false
}));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

var xssSchema = new mongoose.Schema({
name: String,
message: String
});
var XSS = mongoose.model("xssattack", xssSchema);

const storage = multer.diskStorage({
destination: './public/uploads/',
filename: function(req, file, cb){
 cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});

const uploadhard = multer({
storage: storage,
limits:{fileSize: 100000},
fileFilter: function(req, file, cb){
 checkFileTypehard(file, cb);
}
}).single('myImage');

function checkFileTypehard(file, cb){
const filetypes = /jpeg|jpg/;
const extname = filetypes.test(path.extname(file.originalname).toLowerCase());//to check extensions
const mimetype = filetypes.test(file.mimetype);// to check the mime type

if(mimetype && extname){
 return cb(null,true);
} else {
 cb('Error: Images Only!');
}
}

const uploadmedium = multer({
storage: storage,
limits:{fileSize: 1000000000},
fileFilter: function(req, file, cb){
 checkFileTypemedium(file, cb);
}
}).single('myImage');

function checkFileTypemedium(file, cb){
const filetypes = /jpeg|jpg|png|gif/;
const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
const mimetype = filetypes.test(file.mimetype);

if(mimetype && extname){
 return cb(null,true);
} else {
 cb('Error: Images Only!');
}
}

const uploadeasy = multer({
storage: storage,

}).single('myImage');

app.get("/home", function(req,res){
 res.render("home");
});

app.get("/Instructions",function(req, res) {
 res.render("Instruction");
});

app.get("/caesar",function(req, res) {
    res.render("caesar");
});

app.get("/monoaplhabetic",function(req, res) {
    res.render("monoalphabetic");
});

app.get("/vigenere",function(req, res) {
    res.render("vigenere");
});

app.get("/hybrid",function(req, res) {
    res.render("hybrid");
});

app.get("/playfair",function(req, res) {
    res.render("playfair");
});

app.get("/railfence",function(req, res) {
    res.render("railfence");
});

app.get("/stenography",function(req, res) {
    res.render("stenography");
});

app.get("/atbash",function(req, res) {
    res.render("atbash");
});

app.get("/vernam",function(req, res) {
    res.render("vernam");
});

app.get("/hill",function(req, res) {
    res.render("hill");
});

app.get("/jsxor",function(req, res) {
    res.render("jsxor");
});

app.get("/error", function(req, res) {
 res.render("error");
});

app.get("/csrfeasy",function(req,res){
 res.render("csrfeasy");
});

app.post("/csrfeasy",function(req, res) {
 var uname = req.body.username;
 var newpass= req.body.newpassword;
 User.findOneAndUpdate({username: uname}, {$set:{password:newpass}}, {new: true}, (err, doc) => {
 if (err) {
     console.log("Something wrong when updating data!");
 }else{
 res.send("Kindly login again to check if your pasword has been updated successfully, if not then re-enter corect username and try again!!!!");
 }
});
});

app.post("/csrfeasy",function(req, res) {
 var uname = req.body.username;
 var newpass= req.body.newpassword;
 User.findOneAndUpdate({username: uname}, {$set:{password:newpass}}, {new: true}, (err, doc) => {
 if (err) {
     console.log("Something wrong when updating data!");
 }else{
 res.send("Kindly login again to check if your pasword has been updated successfully, if not then re-enter corect username and try again!!!!");
 }
});
});

app.get("/bfeasy", function(req,res){
 res.render("bfeasy");
});

app.post("/bfeasy",function(req, res) {
 var uname =req.body.Username;
 var pass =req.body.password;
 if(uname=='test' && pass=='test'){
     res.render("bfeasysuccesspage");
 }
 else{
     res.send("incorrect password or username");
 }
});

app.get("/bfmedium", function(req,res){
 res.render("bfmedium");
});

app.post("/bfmedium",function(req, res) {
 var uname =req.body.Username;
 var pass =req.body.password;
 if(uname=='test123@' && pass=='test123@'){
   res.render("bfmediumsuccess");
 }
 else{
   res.send("incorrect password or username");
 }
});

app.post("/bfmediumsuccess",function(req, res) {
 var text =req.body.encryprted;
 if(text=='rockyoutext' ){
   res.send("Success!!!! ");
 }
 else{
   res.send("incorrect chipher error");
 }
});


app.get("/bfhard",function(req,res){
 res.render("bfhard");
});

app.post("/bfhard",function(req, res) {
  var uname =req.body.Username;
 var pass =req.body.password;
 if(uname=='xyz@33#test' && pass=='xyz@33#test'){
     res.render("bfhardsuccess");
 }
 else{
     res.send("incorrect password or username");
 }
});

app.post("/bfhardsuccess",function(req, res) {
 var text =req.body.encryprted;
 if(text=='sweetsuccess' ){
     res.send("Success!!!! ");
 }
 else{
     res.send("incorrect chipher error");
 }
});

app.get("/xssdomeasy",function(req,res){
 res.render("xssdomeasy");
});

app.get("/xssdomhard",function(req,res){
 res.render("xssdomhard");
});

app.get("/xssreflectedeasy",function(req,res){
 res.render("xssreflectedeasy");
});

app.get("/xssreflectedmedium",function(req,res){
 res.render("xssreflectedmedium");
});

app.get("/xssreflectedhard",function(req,res){
 res.render("xssreflectedhard");
});

app.get("/xssstoredeasy", function(req, res){
    XSS.find({}, function(err, allxss){
    if(err){
       console.log(err);
       res.redirect("/error");
    } else {
       res.render("xssstoredeasy",{xss:allxss});
    }
 });
});

app.post("/xssstoredeasy", function(req, res){
 var name = req.body.name;
 var msg = req.body.message;
 var newxss = {name: name, message: msg};
 XSS.create(newxss, function(err, newlyCreated){
     if(err){
         console.log(err);
         res.redirect("/error");
     } else {
         res.redirect("/xssstoredeasy");
     }
 });
});
app.get("/xssstoredmedium", function(req, res){
    XSS.find({}, function(err, allxss){
    if(err){
       console.log(err);
       res.redirect("/error");
    } else {
       res.render("xssstoredmedium",{xss:allxss});
    }
 });
});

app.post("/xssstoredmedium", function(req, res){
 var name = req.body.name;
 var msg = req.body.message;
 //var namee = xss(name);
 //var msgg = xss(msg);
 var newxss = {name: name, message: msg};
 XSS.create(newxss, function(err, newlyCreated){
     if(err){
         console.log(err);
         res.redirect("/error");
     } else {
         res.redirect("/xssstoredmedium");
     }
 });
});

app.get("/xssstoredhard", function(req, res){
    XSS.find({}, function(err, allxss){
    if(err){
        res.redirect("/error");
        console.log(err);
    } else {
       res.render("xssstoredhard",{xss:allxss});
    }
 });
});

app.post("/xssstoredhard",function(req, res) {
 req.body.xssattack.name=req.sanitize( req.body.xssattack.name);
 req.body.xssattack.message=req.sanitize( req.body.xssattack.message);
 
 XSS.create(req.body.xssattack, function(err, newlyCreated){
     if(err){
         res.redirect("/error");
         console.log(err);
     } else {
         res.redirect("/xssstoredhard");
     }
 });
});

app.get("/commexeceasy",function(req,res){
 res.render("commexeceasy");
});

app.post("/commexeceasy",function(req,res){
 var x=req.body.uname;
 exec(x,(err,stdout,ster) => {
 if(err){
 console.error(`exec error:${err}`);
 return;
 }
res.render("output",{stdout:stdout})	});
});



app.get("/commexechard",function(req,res){
 res.render("commexechard");
});

app.post("/commexechard",function(req, res) {
  
  var x=req.body.uname;

if(x=="cd"||x=="ls" || x=="touch" ){
 res.send("Please use ping!!");
}

 exec(x,(err,stdout,ster) => {
 if(err){
 console.error(`exec error:${err}`);
 res.send("Unknown Command");
 return;
 }
 
res.render("output",{stdout:stdout})	});
})
;

app.get("/commexecmedium",function(req,res){
 res.render("commexecmedium");
});

app.post("/commexecmedium",function(req, res) {
  
  var x=req.body.uname;

if(x=="cd"||x=="ls" || x=="touch" || x=="cd && ls" ){
 res.send("Please use ping!!");
}

 exec(x,(err,stdout,ster) => {
 if(err){
 console.error(`exec error:${err}`);
 res.send("Unknown Command");
 return;
 }
 
res.render("output",{stdout:stdout})	});
})
;


app.get("/fileuploadhard",function(req,res){
 res.render("fileuploadhard");
});

app.post('/fileuploadhard', (req, res) => {
uploadhard(req, res, (err) => {
 if(err){
   res.render('fileuploadhard', {
     msg: err
   });
 } else {
   if(req.file == undefined){
     res.render('fileuploadhard.ejs', {
       msg: 'Error: No File Selected!'
     });
   } else {
     res.render('fileuploadhard', {
       msg: 'File Uploaded!',
       file: `uploads/${req.file.filename}`
     });
   }
 }
});
});

app.get("/fileuploadeasy",function(req,res){
 res.render("fileuploadeasy.ejs");
});

app.post('/fileuploadeasy', (req, res) => {
uploadeasy(req, res, (err) => {
 if(err){
   res.render('fileuploadeasy', {
     msg: err
   });
 } else {
   if(req.file == undefined){
     res.render('fileuploadeasy.ejs', {
       msg: 'Error: No File Selected!'
     });
   } else {
     res.render('fileuploadeasy', {
       msg: 'File Uploaded!',
       file: `uploads/${req.file.filename}`
     });
   }
 }
});
});
app.get("/fileuploadmedium",function(req,res){
 res.render("fileuploadmedium.ejs");
});
app.post('/fileuploadmedium', (req, res) => {
uploadmedium(req, res, (err) => {
 if(err){
   res.render('fileuploadmedium', {
     msg: err
   });
 } else {
   if(req.file == undefined){
     res.render('fileuploadmedium.ejs', {
       msg: 'Error: No File Selected!'
     });
   } else {
     res.render('fileuploadmedium', {
       msg: 'File Uploaded!',
       file: `uploads/${req.file.filename}`
     });
   }
 }
});
});


app.get("/",function(req,res){
 res.render("login");
});

app.post("/", function(req, res){
 
 var sid = req.sessionID;
 console.log(sid);
 res.cookie('sessionID', sid);
 var uname = req.body.username;
 var pass = req.body.password;
 User.findOne({username: uname ,password: pass}, function(err,user){
   if (err) {
         console.log(err);
     } 
     else if(user==null) {
         res.redirect("/error");
         console.log(err);
     }
     else 
     if(user.username == uname && user.password == pass){
      //sessionStore.destroy(user.session, function(){
       //users.update({_id: user._id}, {$set:{"session" : sid}});
         res.redirect("/home");
     
      //});
      } 
});
});

// app.post("/", passport.authenticate("local", {
//     successRedirect: "/home",
//     failureRedirect: "/"
// }) ,
// function(req, res){
// });

app.get("/signup",function(req, res) {
 res.render("signup");
});

app.post("/signup", function(req, res){
 var sid = req.sessionID;
 console.log(sid);
 var username = req.body.username;
 var password = req.body.password;
 var newUser = {username:username, password:password};
 User.create(newUser, function(err, user){
     if(err){
         console.log(err);
         return res.render('signup');
     } else{
         res.redirect("/home");
     }
 });
});

// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/home");
// });

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/home");
// }

app.use(csrfProtection);

app.get("/csrfhard", csrfProtection, function(req,res){
 res.render("csrfhard", {csrfToken: req.csrfToken() });
});

app.post('/csrfhard', function (req, res) {
 var uname = req.body.username;
 var newpass= req.body.newpassword;
 User.findOneAndUpdate({username: uname}, {$set:{password:newpass}}, {new: true}, (err, doc) => {
 if (err) {
     console.log("Something wrong when updating data!");
 } else{
  res.send("Kindly login again to check if your pasword has been updated successfully, if not then re-enter corect username and try again!!!!");
 }
});
});

let port = process.env.PORT || 27017;
app.listen(port, function(){
    console.log("Server has started at localhost:" + port);
});

    