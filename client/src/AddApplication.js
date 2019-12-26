import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
//import { Formik } from 'formik'

class AddApplication extends Component {
  state = {
    name: '',
    email: '',
    phone:'',
    zip:'',
    picture:''
  }

  handleSave = ({ mutate }) => {
    const {name, email, phone, zip,picture} = this.state;
    const id = require('crypto').randomBytes(5).toString('hex');
    this.props.mutate({
      variables: {id, name, email, phone, zip,picture}
    })
    .then( res => {
      console.log(res);
      this.setState({
        name: '',
        email: '',
        phone:'',
        zip:'',
        picture
      });
    });
  }

  render () {

    return (
      <div>
        <input
          value={this.state.name}
          placeholder='name'
          onChange={(e) => this.setState({name: e.target.value})}
        />
        <input
          value={this.state.email}
          placeholder='email'
          onChange={(e) => this.setState({email: e.target.value})}
        />
        <input
        value={this.state.phone}
        placeholder='phone'
        onChange={(e) => this.setState({phone: e.target.value})}
      />
      <input
      value={this.state.zip}
      placeholder='zip'
      onChange={(e) => this.setState({zip: e.target.value})}
    />
        <button onClick={this.handleSave}>Save</button>
      </div>
    )
  }

}

const addApplication = gql`
  mutation addApplication($id: String!, $name: String!, $email: String!,$phone:String!, $zip:String!,$picture:String) {
    addApplication(id: $id, name: $name, email: $email, phone:$phone, zip:$zip, picture:$picture) {
      id
      name
      email
      phone
      zip
      picture
    }
  }
`;

const addApplicationWithMutation = graphql(addApplication)(AddApplication);

export default addApplicationWithMutation;
