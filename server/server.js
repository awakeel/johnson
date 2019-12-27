const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
    cover:''
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    cover:''
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String, cover:String }
  scalar Upload
  type Mutation {
    addBook(title: String, author: String, cover:String): Book
    coverUpload(file: Upload!): File!
  }  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
  Mutation:{
  addBook:(root, args)=>{
      books.push(args);
  },
  coverUpload: (parent, args) => {
    return args.file.then(file => {
      return file;
    });
  }
}
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(5000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});