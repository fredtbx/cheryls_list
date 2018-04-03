import React, { Component } from 'react';

import './Filter.css';

class Search extends Component {
  handleChange = event => {
    const { onChange } = this.props;
    const value = event.target.value;
    onChange(value);
  };

  render() {
    const { searchTerm } = this.props;
    return (
      <input
        className="Items-searchTerm"
        value={searchTerm}
        placeholder="Search"
        onChange={this.handleChange}
      />
    );
  }
}

export default Search;
