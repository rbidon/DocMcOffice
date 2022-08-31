const express = require('express');
const router = express.Router();
// import the schema model I created to used for CRUD
const Appt = require('../models/appt.js');

// custom middleware to require authentication on routes
const authRequired = (req, res, next) => {
	if(req.session.currentUser){
		// a user is signed in
		next()
		// next is part of express
		// it does what it says
		// i.e, go on to the next thing
	} else {
		// if there is no user
		res.send('You must be logged in to do that!')
		// res.redirect('/user/signin')
	}
}

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
//             time: "08:30",
//             date: "2022-08-31",
//             reason: "Annual Physical",
//             firstAppt: false
//         },
//         {
//             firstName:"Will" ,
//             lastName:"Smith",
//             docName:"Jack Bahari",
//             time: "11:00",
//             date: "2022-12-15",
//             reason: "Been feeling lightheaded, want the doctor to check it out.",
//             firstAppt: true
//         },
//         {
//             firstName:"Spencer",
//             lastName: "Reid",
//             docName:"Nancy Muller",
//             time: "18:00",
//             date: "2022-11-15",
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
    if(req.body.firstAppt === 'on') {
		req.body.firstAppt = true
	} else {
		req.body.firstAppt = false
	}
    Appt.create(req.body,(error,createAppt) =>{
        if(error){
            console.log('error', error);
			res.send(error);
        }else{
            res.redirect('/patient');
        }
    })
})

// DELETE PAGE FOR SHOW/INDEX PAGE 
router.delete("/:id", (req, res)=>{
    Appt.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) console.log(err)
		res.redirect('/patient')})
})

// EDIT PAGE
router.get("/:id/edit", (req, res)=>{
    if(req.body.firstAppt === 'on') {
		req.body.firstAppt = true
	} else {
		req.body.firstAppt = false
	}
    Appt.findById(req.params.id, (err,editAppt)=>{
        res.render("edit.ejs", {appt: editAppt})
    })
})
// UPDATE PAGE
router.put("/:id",(req, res)=>{
    
    if(req.body.firstAppt === 'on') {
		req.body.firstAppt = true
	} else {
		req.body.firstAppt = false
	}
    console.log(req.body)
    Appt.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, appt) => {
        if(err){
            console.log(err)
        } else{
             res.redirect(`/patient`)
        }
    })  
		
})

//SORT DATABASE 
// router.put("/descendingdates", (req, res)=>{
//     Appt.sort({date:-1})
//     console.log( Appt.sort({date:-1}))
//          res.render(`${Appt.date}`)
//     console.log(req.body, req.params.id)
// })

// router.put("/:id/ascendingdates", (req, res)=>{
//     Appt.find(req.params.id, req.body).sort({date:1})
//          res.redirect(`/patient`)
    
// })
module.exports = router