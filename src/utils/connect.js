import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ContactDB", {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>console.log("Success"))
.catch((err)=>console.log(err));