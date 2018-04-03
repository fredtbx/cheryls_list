import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
  render() {
    const { item, onRemove, onStrikeThrough } = this.props;
    return (
      <article className="Item">
        <label htmlFor={item.id}>
          <input type="checkbox" checked={item.added} onChange={() => this.props.onToggle(item)} id={item.id} />
          <span style={{ textDecorationLine: item.picked ? 'line-through' : '' }}>
            {item.value}
          </span>
        </label>
        <button className="Item-remove" onClick={onRemove}>
          Remove
        </button>
        <button className="Item-remove" onClick={onStrikeThrough}>
          Got it!
        </button>
      </article>
    );
  }
}

export default Item;
