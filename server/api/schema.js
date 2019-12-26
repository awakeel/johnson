import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Application {
		id: ID!
		name:String
		email: String
		zip:String
		phone:String
		picture: String
	}

	type Query {
		allApplications: [Application]
	}
	type Mutation {
		addApplication(id: String!, name: String!, email: String!,zip: String!,phone: String!,picture: String!): Application
	  }
	
`;

export default typeDefs;
