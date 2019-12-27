import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
//import { Formik } from 'formik'
import { Formik, Form, Field, ErrorMessage } from "formik";

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
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneTest = /^[0-9]{3}\)[0-9]{3}-[0-9]{4}$/i;

    return (
      <div className="div-form">
      <Formik
      initialValues={{name:"", email: "", phone: "",zip:"" }}

              validate={values => {
                let errors = {};
                
                if (values.name === "") {
                  errors.name = "name required";
                } 
                if (values.email === "") {
                  errors.email = "Email is required";
                } else if (!emailTest.test(values.email)) {
                  errors.email = "Invalid email address format";
                }
                if (values.phone === "") {
                  errors.phone = "phone number required";
                } else if (!phoneTest.test(values.phone)) {
                  errors.phone = "Invalid phone format";
                }


                if (values.zip === "") {
                  errors.zip = "zip required";
                } 
                return errors;
              }}
              onSubmit={({ setSubmitting }) => {
                alert("Form is validated! Submitting the form...");
                setSubmitting(false);
                this.handleSave();
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  onChange={(e)=>this.setState({name: e.target.value})}
                  type="name"
                  name="name"
                  placeholder="Enter name"
                  className={`form-control ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="name"
                  className="invalid-feedback"
                />
              </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      onChange={(e)=>this.setState({name: e.target.value})}

                      placeholder="Enter email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">phone</label>
                    <Field
                      type="text"
                      name="phone"
                      onChange={(e)=>this.setState({name: e.target.value})}

                      placeholder="Enter phone"
                      className={`form-control ${
                        touched.phone && errors.phone ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="phone"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                  <label htmlFor="phone">Zip</label>
                  <Field
                    type="text"
                    name="zip"
                    placeholder="Enter zip"
                    onChange={(e)=>this.setState({name: e.target.value})}

                    className={`form-control ${
                      touched.zip && errors.zip ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="zip"
                    className="invalid-feedback"
                  />
                </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
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
