import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './App.css';
import AddApplication from './AddApplication';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <h2>UPWORK CLIENT</h2>
          </div>
          <AddApplication />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
