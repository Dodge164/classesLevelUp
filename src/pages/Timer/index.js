import React from 'react';
import { Layout, Typography, Button } from 'antd';
import Clock from '../../components/Clock';

const { Content } = Layout;
const { Title } = Typography;

export default class TimerPage extends React.Component {
  state = {
    showTimer: true,
  };

  handleToggleClock = () => {
    this.setState(({ showTimer }) => {
      return {
        showTimer: !showTimer,
      };
    });
  };

  render() {
    const { showTimer } = this.state;
    return (
      <Layout>
        <Content>
          <div>
            <Title>Tick-Tac</Title>
            <Button type="primary" onClick={this.handleToggleClock}>
              On/Off
            </Button>
            {showTimer && <Clock currentDate={new Date()} />}
          </div>
        </Content>
      </Layout>
    );
  }
}
