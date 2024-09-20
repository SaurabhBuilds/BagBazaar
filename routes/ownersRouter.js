const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model")

router.get("/", function(req,res){
    let error = 0
    res.render("owner-login2",{error})
});

if(process.env.NODE_ENV === "development"){ //ye environment based routing hai ,means ye route jo hai wo production me nhi chalega sirf development me chalega
    router.post("/create",async function(req, res){
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res.status(503).send("you don't have permission to create a new owner.")
        }
        let {fullname, email, password} = req.body

        await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send("we can create a new owner");
    })
};

router.get("/admin" , function (req,res){
    let success = req.flash("success")
    res.render("createproducts",{success})
})

router.get("/admin/products" , function (req,res){
    // let success = req.flash("success")
    res.render("admin")
})

module.exports = router;