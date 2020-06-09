const express = require('express')
const router = express.Router()
const novaList = require('../models/novalist.js')

router.post('/', async (req, res) => {
    try{
        const creatednovaList = await novaList.create(req.body)
        res.status(200).json(creatednovaList)
        console.log(creatednovaList)
    } catch(error){
        res.status(400).json(error)
    }
})

router.get('/', async (req, res) => {
    try{
        const novaLists = await novaList.find({})
        res.status(200).json(novaLists)
    }
    catch (error){
        res.status(400).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const deletednovaList = await novaList.findByIdAndDelete(req.params.id)
        res.status(200).json(deletednovaList)
    } catch (error){
        res.status(400).json(error)
    }
})

router.put('/:id', async (req, res) => {
    try{
        const updatednovaList = await novaList.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatednovaList)
    } catch (error){
        res.status(400).json(error)
    }
})

module.exports = router