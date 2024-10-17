const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI,
);

async function resetDatabase() {
  await mongoose.connect('mongodb://localhost/cart-app', {
  });
   const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }

  console.log("Database reset successful");
  mongoose.connection.close();
}

//resetDatabase();

module.exports = mongoose.connection;