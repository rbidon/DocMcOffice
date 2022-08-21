const express = require('express');
const router = express.Router();
// import the schema model I created to used for CRUD
const Appt = require('../models/appt.js');

//using router to do CRUD
// export the router to be set the router name in server.js
// INDEX PAGE
router.get('/', (req, res) =>{
    Appt.find({},(err,appt)=>{
        console.log("All Appts storaged", appt)
        res.render("index.ejs",{allAppts:appt})
    });
});
// SEND ALREADY DATA PROVIDED using Seed
// router.get("/seed/newappt", async(req,res)=>{
//     const newAppts =[
//         {
//             firstName:"Daphneia",
//             lastName: "Jackson",
//             docName:"Rousse Bidon",
//             time: "11:00am",
//             date: "08/20/2022",
//             reason: "Annual Physical",
//             firstAppt: false
//         },
//         {
//             firstName:"Will" ,
//             lastName:"Smith",
//             docName:"Jack Bahari",
//             time: "1:00pm",
//             date: "12/20/2022",
//             reason: "Been feeling lightheaded, want the doctor to check it out.",
//             firstAppt: true
//         },
//         {
//             firstName:"Spencer",
//             lastName: "Reid",
//             docName:"Nancy Muller",
//             time: "4:00pm",
//             date: "11/15/2022",
//             reason: "Feeling sick for a couple of dates would like the doctor to run some tests.",
//             firstAppt: false
//         }
//     ];
//     try {
//         const seedAppt = await Appt.create(newAppts)
//         res.send(seedAppt)
//       } catch (err) {
//         res.send(err.message)
//       }
// });
// NEW PAGE B4 SHOW PAGE
router.get("/new", (req, res)=>{
    res.render("new.ejs");
});

// SHOW PAGE
router.get("/:id",(req, res)=>{
    Appt.findById(req.params.id,(error, appt)=>{
            res.render(
                "show.ejs", {appt: appt});
        })
});

// CREATE PAGE FOR NEW/ EDIT/ DELETE OPTIONS
router.post("/",(req, res)=>{
    Appt.create(req.body,(error,createAppt) =>{
        if(error){
            console.log('error', error);
			res.send(error);
        }else{
            res.redirect('/patient');
        }
    })
})
module.exports = router