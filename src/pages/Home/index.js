import React from 'react';
import { connect } from 'react-redux';

import {
  ClockCircleOutlined,
  HomeOutlined,
  SmileOutlined,
} from '@ant-design/icons';

import BackgroundBlock from '../../components/BackgroundBlock';
import Button from '../../components/Button';
import CardList from '../../components/CardList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Section from '../../components/Section';

import firstBackground from '../../assets/background.jpg';
import secondBackground from '../../assets/back2.jpg';

import s from './Home.module.scss';
import FirebaseContext from '../../context/firebaseContext';
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';

class HomePage extends React.Component {
  state = {
    wordsArr: [],
  };
  constructor(props) {
    super(props);
    this.refEngInput = React.createRef();
  }

  componentDidMount() {
    const { getUserCardsRef } = this.context;
    getUserCardsRef().on('value', (res) => {
      this.setState({
        wordsArr: res.val() || [],
      });
    });
  }

  handleSubmitButton = ({ eng, rus }) => {
    const { getUserUidRef } = this.context;
    const { wordsArr } = this.state;

    getUserUidRef().set([
      ...wordsArr,
      {
        id: +new Date(),
        eng,
        rus,
      },
    ]);
  };

  handleDeletedItem = (id) => {
    const { getUserUidRef } = this.context;
    const { wordsArr } = this.state;
    const newWordsList = wordsArr.filter((item) => item.id !== id);
    getUserUidRef().set(newWordsList);
  };

  render() {
    const { wordsArr } = this.state;
    const { countNumber, minusAction, plusAction } = this.props;
    return (
      <>
        <BackgroundBlock backgroundImg={firstBackground} fullHeight>
          <Header white>Время учить слова online</Header>
          <Header white>{countNumber}</Header>
          <Button
            onBtnClick={() => {
              plusAction(1);
            }}
          >
            PLUS
          </Button>
          <Button
            onBtnClick={() => {
              minusAction(1);
            }}
          >
            MINUS
          </Button>
          <Paragraph white>
            Используйте карточки для запоминания и пополняйте активный словарный
            запас.
          </Paragraph>
          <Button
            onBtnClick={() => {
              this.refEngInput.current.focus();
            }}
          >
            Начать бесплатный урок
          </Button>
        </BackgroundBlock>
        <Section className={s.textCenter}>
          <Header size="l">
            Мы создали уроки, чтобы помочь вам увереннее разговаривать на
            английском языке
          </Header>
          <div className={s.motivation}>
            <div className={s.motivationBlock}>
              <div className={s.icons}>
                <ClockCircleOutlined />
              </div>
              <Paragraph small>Учитесь, когда есть свободная минутка</Paragraph>
            </div>

            <div className={s.motivationBlock}>
              <div className={s.icons}>
                <HomeOutlined />
              </div>
              <Paragraph small>
                Откуда угодно — дома, в&nbsp;офисе, в&nbsp;кафе
              </Paragraph>
            </div>

            <div className={s.motivationBlock}>
              <div className={s.icons}>
                <SmileOutlined />
              </div>
              <Paragraph small>
                Разговоры по-английски без&nbsp;неловких пауз
                и&nbsp;«mmm,&nbsp;how&nbsp;to&nbsp;say…»
              </Paragraph>
            </div>
          </div>
        </Section>
        <Section bgColor="#f0f0f0" className={s.textCenter}>
          <Header size="l">Начать учить английский просто</Header>
          <Paragraph>
            Кликайте по карточкам и узнавайте новые слова, быстро и легко!
          </Paragraph>
          <CardList
            refEngInput={this.refEngInput}
            onSubmit={this.handleSubmitButton}
            onDeletedItem={this.handleDeletedItem}
            items={wordsArr}
          />
        </Section>

        <BackgroundBlock backgroundImg={secondBackground}>
          <Header size="l" white>
            Изучайте английский с персональным сайтом помощником
          </Header>
          <Paragraph white>Начните прямо сейчас</Paragraph>
        </BackgroundBlock>

        <Footer />
      </>
    );
  }
}
HomePage.contextType = FirebaseContext;

const mapStateToProps = (state) => {
  console.log('== state ==', state);
  return { countNumber: state.counterReducer.count };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
