import React from 'react';
import Card from '../Card';
import { Form, Input, Button } from 'antd';

import s from './CardList.module.scss';

class CardList extends React.Component {
  formRef = React.createRef();
  constructor({ refEngInput }) {
    super();
    this.refEngInput = refEngInput;
  }

  handleSubmitForm = (values) => {
    console.log('===> values', values);
    const { onSubmit } = this.props;
    onSubmit && onSubmit(values);

    this.formRef.current.resetFields();
  };

  // handleDeletedItem = (id) => {
  //   this.setState(({ wordsArr }) => {
  //     console.log('state', this.state);
  //     const idx = wordsArr.findIndex((item) => item.id === id);
  //     const newWordsList = [
  //       ...wordsArr.slice(0, idx),
  //       ...wordsArr.slice(idx + 1),
  //     ];
  //     return { wordsArr: newWordsList };
  //   });
  // };

  renderWordForm = () => {
    return (
      <div className={s.form}>
        <Form
          ref={this.formRef}
          name="basic"
          layout="inline"
          onFinish={this.handleSubmitForm}
        >
          <Form.Item label="English Word" name="eng">
            <Input
              onChange={this.handleChangeEngInput}
              ref={this.refEngInput}
              placeholder="input placeholder"
            />
          </Form.Item>
          <Form.Item label="Russian Word" name="rus">
            <Input
              onChange={this.handleChangeRusInput}
              placeholder="input placeholder"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
      </div>
    );
  };

  render() {
    const { items = [], onDeletedItem } = this.props;

    return (
      <>
        {this.renderWordForm()}
        <div className={s.root}>
          {items.map(({ eng, rus, id }) => (
            <Card
              onDeleted={() => {
                console.log('###: 2 level');
                onDeletedItem(id);
              }}
              key={id}
              eng={eng}
              rus={rus}
            />
          ))}
        </div>
      </>
    );
  }
}

export default CardList;
