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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUserAction } from './actions';

class App extends React.Component {
  componentDidMount() {
    const { auth, setUserUid } = this.context;
    const { addUser } = this.props;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        localStorage.setItem('user', JSON.stringify(user.uid));
        addUser(user);
      } else {
        setUserUid(null);
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    const { userUid } = this.props;
    if (userUid === null) {
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
const mapStateToProps = (state) => {
  return {
    userUid: state.userReducer.userUid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addUser: addUserAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
