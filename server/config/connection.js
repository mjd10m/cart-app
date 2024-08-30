const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/cart-app',
);

module.exports = mongoose.connection;