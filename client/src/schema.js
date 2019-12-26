export const typeDefs = `
  type Application {
    id: ID!
    name: String
    email: String
    phone: String
    zip: String,
    picture
  }

  type Query {
    application: [Application]
  }
`;