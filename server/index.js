import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import typeDefs from './api/schema';
import resolvers from './api/resolvers';

const app = express();

const PORT = 4000;
app.use('*', cors({ origin: 'http://localhost:3000'}));

const SERVER = new ApolloServer({
	typeDefs,
	resolvers,
	playground: {
		settings: {
			'editor.theme': 'light'
		}
	}
});

SERVER.applyMiddleware({ app });

app.listen(PORT, () =>
	console.log(`🚀 GraphQL playground is running at http://localhost:4000`)
);
