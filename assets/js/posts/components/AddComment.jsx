/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { I18n, Translate } from 'react-i18nify';

import yup from 'yup';
import Form from 'react-formal';

export class AddComment extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
    this.schema = yup.object({
      text: yup.string().required(I18n.t('errors.blank')),
    });
    this.state = {
      form: {
        text: '',
      },
    };
  }

  save(formValue) {
    this.props.onSave(formValue.text);
    this.setState({
      form: {
        text: '',
      },
    });
  }

  change(formValue) {
    this.setState({
      form: formValue,
    });
  }

  render() {
    return (
      <Form
        schema={this.schema}
        value={this.state.form}
        onSubmit={this.save}
        onChange={this.change}
        className="form-inline row add-comment"
      >
        <div className="input-group col-8">
          <Form.Field name="text" className="form-control mr-1" />
        </div>
        <div className="input-group col-4">
          <Form.Button type="submit" className="btn btn-outline-success">
            <Translate value="posts.comments.save" />
          </Form.Button>
        </div>
      </Form>
    );
  }
}

AddComment.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default AddComment;
