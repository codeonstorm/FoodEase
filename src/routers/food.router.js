const express = require('express');
const {sample_foods, sample_tags, sample_users} = require('../../data');
const FoodModel = require('../models/food.model');


const router = express.Router();

router.get('/seed', async function (req, res) {
    const foodCount = await FoodModel.countDocuments();
    if(foodCount > 0){
        res.send('seed is already done');
        return;
    }
    await FoodModel.create(sample_foods);
    res.send(foodCount);
})


router.get('/', async function (req, res) {
    const foods = await FoodModel.find()
    res.send(foods)
})

router.get('/search/:searchTerm', async function (req, res) {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const foods = await FoodModel.find({name: {$regex:searchRegex}})
    res.send(foods)
})



router.get('/tag/:tagName', async (req, res) => {
    const foods = await FoodModel.find({tags: req.params.tagName})
    res.send(foods)
})

router.get('/tag', async (req, res) => {
    const tags = await FoodModel.aggregate([
        {
          $unwind:'$tags'
        },
        {
          $group:{
            _id: '$tags',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await FoodModel.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
  
})

router.get('/:foodId', async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food)
})

module.exports = router;


