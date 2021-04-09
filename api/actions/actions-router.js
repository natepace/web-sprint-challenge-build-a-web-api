// Write your "actions" router here!
const Action = require('./actions-model')
const express = require('express')
const router = express.Router()
const mw = require("./actionsmw.js")
router.get('/', (req, res) => {
    const { id } = req.params
    Action.get(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: "does not compute" })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Action.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json('action not found')
            }
            else {
                res.status(200).json(action)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "does not compute" })
        })
})

router.post('/', mw.validateActionBody, (req, res) => {
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: "does not compute" })
        })

})
// router.post("/", (req, res) => {
//     Action.insert(req.body)
//         .then(action => {
//             res.status(201).json(action);
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json(error.message);
//         })
// })
router.put('/:id', mw.validateActionID, mw.validateActionBody, (req, res) => {
    const { id } = req.params
    const changes = req.body
    Action.update(id, changes)
        .then(action => {
            if (!changes.description || !changes.notes || !changes.completed) {
                res.status(404).json({ message: "action doesnt exist" })
            }
            else {
                if (!action) {
                    res.status(400).json({ message: "please provide description, notes, and boolean" })
                }
                else {
                    res.status(200).json(action)
                }
            }
        })
})

router.delete('/:id', mw.validateActionID, (req, res) => {
    const { id } = req.params
    Action.remove(id)
        .then(action => {
            if (!action) {
                res.status(404).json("action not found")
            }
            else {
                res.status(201).json(action)
            }
        })
})

module.exports = router