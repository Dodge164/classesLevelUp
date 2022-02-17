import React from 'react';
import { Layout, Form, Input, Button } from 'antd';

import s from './Login.module.scss';
import FirebaseContext from '../../context/firebaseContext';

const { Content } = Layout;

export default class LoginPage extends React.Component {
  onFinish = ({ email, password }) => {
    const { signWithEmail } = this.context;
    signWithEmail(email, password).then((res) => {
      console.log('===> res', res);
    });
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  renderForm = () => {
    return (
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  render() {
    return (
      <Layout>
        <Content>
          <div className={s.root}>
            <div className={s.form_wrap}>{this.renderForm()}</div>
          </div>
        </Content>
      </Layout>
    );
  }
}

LoginPage.contextType = FirebaseContext;
