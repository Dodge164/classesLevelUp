import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';

import { Menu, Spin } from 'antd';

import s from './App.module.scss';
import FirebaseContext from './context/firebaseContext';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { PrivateRoute } from './utils/privateRoute';

class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const { auth, setUserUid } = this.context;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        // localStorage.setItem('user', JSON.stringify(user.uid));
        this.setState({ user });
      } else {
        setUserUid(null);
        localStorage.removeItem('user');
        this.setState({ user: false });
      }
    });
  }

  render() {
    const { user } = this.state;
    if (user === null) {
      return (
        <div className={s.wrap_spin}>
          <Spin tip="Loading..." />
        </div>
      );
    }

    return (
      <BrowserRouter>
        <Route path="/login" component={LoginPage} />
        <Route
          render={(props) => {
            return (
              <Layout>
                <Header>
                  <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">
                      <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to="/about">About</Link>
                    </Menu.Item>
                  </Menu>
                </Header>
                <Content>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <PrivateRoute path="/home" component={HomePage} />
                </Content>
              </Layout>
            );
          }}
        />
      </BrowserRouter>
    );
  }
}
App.contextType = FirebaseContext;
export default App;
