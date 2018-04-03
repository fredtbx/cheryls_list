import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';

import './NewItem.css';

class NewItem extends Component {
  state = { value: '' };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value });
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    const { value } = this.state;

    event.preventDefault();

    onSubmit({ value, id: uniqueId(), picked: true });

    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <form className="NewItem" onSubmit={this.handleSubmit}>
        <input
          className="NewItem-input"
          type="text"
          value={value}
          placeholder="Enter an item"
          onChange={this.handleChange}
        />
        <input className="NewItem-submit button" type="submit" />
      </form>
    );
  }
}

export default NewItem;
