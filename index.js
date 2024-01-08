
const express = require("express")

const port = 3000

const app = express()

app.use(express.json())

const users = [{
    name: "jhon",
    kidneys: [{
        healthy: false
    }]
}];

app.get("/", function (req, res) {                      //get method
    const jhonkedney = users[0].kidneys;
    const numberofkidney = jhonkedney.length
    let numberofhealthykidney = 0;
    for (let i = 0; i < numberofkidney; i++) {
        if (jhonkedney[i].healthy) {
            numberofhealthykidney += 1;
        }
    }
    const numberofunhealthykidney = numberofkidney - numberofhealthykidney
    res.json({
        numberofkidney,
        numberofhealthykidney,
        numberofunhealthykidney
    });
})

app.post("/", function (req, res) {                     //post method
    const ishealthy = req.body.ishealthy
    users[0].kidneys.push({
        healthy: ishealthy
    })
    let msg = ishealthy ? 'healthy' : 'unhealthy';
    res.json({
        msg: "Added " + msg + " Kidney !"
    })
})

app.put("/", function (req, res) {                      //put method
    if (checkunhealthy()) {
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        res.json({
            msg: "Updated unhealthy kidney to healthy kidney !"
        })
    }
    else {
        res.status(411).json({
            msg: "You have no unhealthy kidney !"
        })
    }
})

app.delete("/", function (req, res) {                   //delete method
    if (checkunhealthy()) {
        const newkidney = []
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newkidney.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newkidney;
        res.json({
            msg: "deleted unhealthy kidneys !"
        })
    }
    else {
        res.status(411).json({
            msg: "You have no unhealthy kidneys !"
        })
    }
})

function checkunhealthy() {                                //check unhealthy kidney
    let check = false
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            return check = true
        }
    }
}

app.listen(port);

