require('dotenv').config()
const express = require('express');
const cors = require('cors');
const foodRouter = require('./routers/food.router');
const userRouter = require('./routers/user.router');
const orderRouter = require('./routers/order.router');
const dbConnect = require('./config/database.config');
dbConnect();


const app = express()
app.use(express.json());
app.use(cors());

app.use("/api/foods", foodRouter);

app.use("/api/users", userRouter);

app.use("/api/orders", orderRouter);


const port = process.env.PORT || 8000;
 

app.listen(port, () => {
  console.log('Website served on http://localhost:'+ port);
})
