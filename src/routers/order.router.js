const express = require('express');
const {sample_foods, sample_tags, sample_users} = require('../../data');
const authMiddleware = require('../middlewares/auth.middleware');


const router = express.Router();
router.use(authMiddleware);

// router.post('/create', async function (req, res) {
//     const requestOrder = req.body;
//     if(requestOrder.items.length <= 0){
//         res.status(400).send('Cart is Empty!');
//         return;
//     }

//     await OredrModel.deleteOne({
//         user: req.user.id,
//         status: OrderStatus.NEW
//     });

//     const newOrder = new OredrModel({...requestOrder, user: req.user.id});
//     await newOrder.save();

//     res.send();
// })



module.exports = router;


