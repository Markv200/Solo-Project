const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const templateRouter = require('./routes/template.router'); // Main inventory router, renamed for accuracy
const inventoryDetailsRouter = require('./routes/inventoryDetails.router'); // New router for item details
const cartRouter = require('./routes/cart.router');
const orderRouter = require('./routes/order.router'); // Import new order router
const adminRouter = require('./routes/admin.router');


// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/inventory', templateRouter); // Use template.router.js as the main inventory route
app.use('/api/inventory/details', inventoryDetailsRouter); // Route for detailed item info
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter); // Add order router
app.use('/api/admin', adminRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
