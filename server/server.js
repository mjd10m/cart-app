require('dotenv').config();
const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const path = require('path');
const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');
const cors = require('cors');
const { graphqlUploadExpress } = require('graphql-upload');


const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/dist/index.html'));
});

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