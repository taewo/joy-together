import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

class Form extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    console.log('target', e.target.value);
    e.preventDefault();
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div>
        <h1>
          Form
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name</label>
            <div>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'simple'
})(Form)
