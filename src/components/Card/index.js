import React from 'react';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';

import s from './Card.module.scss';

class Card extends React.Component {
  state = {
    done: false,
    isRemembered: false,
  };

  componentDidMount() {
    const {
      match: { params },
      index,
    } = this.props;
    if (index === +params.id) {
      this.setState({
        done: params.isDone,
      });
    }
  }

  handleCardClick = () => {
    if (!this.state.isRemembered) {
      this.setState(({ done }) => {
        return {
          done: !done,
        };
      });
    }
  };

  handleIsRememberClick = () => {
    this.setState(() => {
      return {
        isRemembered: true,
        done: true,
      };
    });
  };

  handleDeletedClick = () => {
    this.props.onDeleted();
  };

  render() {
    const { eng, rus } = this.props;
    const { done, isRemembered } = this.state;

    return (
      <div className={s.root}>
        <div
          className={cn(s.card, {
            [s.done]: done,
            [s.isRemembered]: isRemembered,
          })}
          onClick={this.handleCardClick}
        >
          <div className={s.cardInner}>
            <div className={s.cardFront}>{eng}</div>
            <div className={s.cardBack}>{rus}</div>
          </div>
        </div>
        <div className={s.icons}>
          <CheckSquareOutlined
            className={cn(s.icons, {
              [s.active]: isRemembered,
            })}
            onClick={this.handleIsRememberClick}
          />
        </div>
        <div className={cn(s.icons, s.deleted)}>
          <DeleteOutlined onClick={this.handleDeletedClick} />
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
