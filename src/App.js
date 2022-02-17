import React from 'react';
import HomePage from './pages/Home';

import LoginPage from './pages/Login';

import { Spin } from 'antd';

import s from './App.module.scss';
import FirebaseContext from './context/firebaseContext';
class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    console.log('===> context', this.context);
    const { auth, setUserUid } = this.context;
    auth.onAuthStateChanged((user) => {
      console.log('===> onAuthStateChanged');
      if (user) {
        setUserUid(user.uid);
        this.setState({ user });
      } else {
        setUserUid(null);
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
    return <>{user ? <HomePage user={user} /> : <LoginPage />}</>;
  }
}
App.contextType = FirebaseContext;
export default App;
