const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const path = require('path');
const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const {Storage} = require('@google-cloud/storage') 

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const gc = new Storage({
  keyFilename: path.join(__dirname,"./tag-my-cart-ec28d69b2334.json"),
  projectId: 'tag-my-cart'
})

const bucket = gc.bucket('cart-app-storage')

googleCloud.getBuckets().then(x => console.log(x))

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
  
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      })
  })
};
    
    // Call the async function to start the server
    startApolloServer(typeDefs, resolvers);