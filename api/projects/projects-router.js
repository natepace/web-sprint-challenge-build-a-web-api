// Write your "projects" router here!
const Project = require('./projects-model')
const express = require('express')
const router = express.Router()
const mw = require('./projectsmw')

router.get('/', (req, res) => {
    const { id } = req.params
    Project.get(id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Project.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json("no project wit dat id fam")
            }
            else {
                res.status(200).json(project)
            }

        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        })
})

router.post("/", mw.validateProjectBody, (req, res) => {

    Project.insert(req.body)

        .then(project => {

            res.status(201).json(project)
        })
        .catch(err => {

            res.status(500).json(err.message);
        })
})

// router.post("/", mw.validateProjectBody, (req, res) => {
//     Project.insert(req.body)
//         .then(project => {
//             res.status(201).json(project);
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json(error.message);
//         })
// })
// router.put('/:id', (req, res) => {
//     const { id } = req.params
//     const changes = req.body
//     Project.update(id, changes)
//         .then(project => {
//             if (!changes.description || !changes.notes || !changes.completed) {
//                 res.status(404).json({ message: "project doesnt exist" })
//             }
//             else {
//                 if (!project) {
//                     res.status(400).json({ message: "provide things plz" })
//                 }
//                 else {
//                     res.status(200).json(project)
//                 }

//             }
//         })
// })
router.put("/:id", mw.validateProjectID, mw.validateProjectBody, (req, res) => {
    Project.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        })
})
router.delete("/:id", mw.validateProjectID, (req, res) => {
    Project.remove(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        })
})

router.get('/:id/actions', mw.validateProjectID, (req, res) => {
    const { id } = req.params
    Project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})



module.exports = router