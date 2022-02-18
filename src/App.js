import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';

import { Menu, Spin } from 'antd';

import s from './App.module.scss';
import FirebaseContext from './context/firebaseContext';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { PrivateRoute } from './utils/privateRoute';
import CurrentCard from './pages/CurrentCard';

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
      <>
        <Route path="/login" component={LoginPage} />
        <Route
          render={() => {
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
                    <Menu.Item key="3">
                      <Link to="/word">Current Word</Link>
                    </Menu.Item>
                  </Menu>
                </Header>
                <Content>
                  <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <PrivateRoute
                      path="/home/:id?/:isDone?"
                      component={HomePage}
                    />
                    <PrivateRoute path="/word/:id?" component={CurrentCard} />
                    <Redirect to="/" />
                  </Switch>
                </Content>
              </Layout>
            );
          }}
        />
      </>
    );
  }
}
App.contextType = FirebaseContext;
export default App;
