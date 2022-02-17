import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export default class Clock extends React.PureComponent {
  state = {
    date: this.props.currentDate,
  };

  constructor(props) {
    super(props);
    console.log('===> constructor');
  }

  componentDidMount() {
    console.log('===> componentDidMount');
    this.interval = setInterval(this.tick, 1000);
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log('===> shouldComponentUpdate');
  //     if (this.state.date < nextState.date) {
  //       return false;
  //     }
  //     return true;
  //   }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('===> componentDidUpdate');
    //     //   if (this.state !== prevState) {
    //     //     this.setState({});
    //     //   }
  }

  componentWillUnmount() {
    console.log('===> componentWillUnmount');
    clearInterval(this.interval);
  }

  tick = () => {
    console.log('===> tick');
    this.setState({
      date: new Date(),
    });
  };

  render() {
    const { date } = this.state;
    return (
      <>
        <Title level={2}>Now {date.toLocaleTimeString()}</Title>
      </>
    );
  }
}
