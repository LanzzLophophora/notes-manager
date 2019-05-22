import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Form, Input, Tooltip, Icon, Button } from 'antd';

import { registrationUser } from '../store/auth/thunks';

class NormalRegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    error: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { registrationUser, form } = this.props;
    form.validateFieldsAndScroll((error, values) => {
      const { email, password, confirm, name } = values;
      if (password !== confirm) {
        this.setState({
          error: "Incorrect confirm password!"
        })
      } else {
        registrationUser(email, password, name);
      }
    });
  };

  componentDidMount() {
    const { history, user, error } = this.props;
    this.setState({
      error
    });
    if (user) {
      history.push('/notes');
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;

    return (
      <div className={"my-form"}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password"/>
            )}
          </Form.Item>
          <Form.Item
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur}/>
            )}
          </Form.Item>
          <Form.Item
            label={(
              <span>
              Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
            )}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
          {error && <p className="ant-row error">{error}</p>}
        </Form>
      </div>
    );
  }
}

const RegistrationForm = Form.create({ name: 'register' })(NormalRegistrationForm);

const mapStateToProps = store => ({
  user: store.auth.user,
  error: store.auth.error,
});

const mapDispatchToProps = {
  registrationUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationForm)
);
