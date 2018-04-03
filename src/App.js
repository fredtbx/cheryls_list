import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import NewItem from './NewItem';
import Items from './Items';

import './App.css';

const defaultState = [
  { value: 'bagels', id: uniqueId(), added: false, picked: false },
  { value: 'Coffee Mate', id: uniqueId(), added: false, picked: false },
  { value: 'almond milk', id: uniqueId(), added: false, picked: false },
  { value: 'eggs', id: uniqueId(), added: false, picked: false },
  { value: 'pork', id: uniqueId(), added: false, picked: false },
  { value: 'hamburger', id: uniqueId(), added: false, picked: false },
  { value: 'chicken', id: uniqueId(), added: false, picked: false },
  { value: 'avocados', id: uniqueId(), added: false, picked: false },
  { value: 'Pirate booty', id: uniqueId(), added: false, picked: false },
  { value: 'cat food', id: uniqueId(), added: false, picked: false },
  { value: 'water', id: uniqueId(), added: false, picked: false },
  { value: 'frozen vegetables', id: uniqueId(), added: false, picked: false },
  { value: 'bread', id: uniqueId(), added: false, picked: false }
];

class App extends Component {
  state = {
    // Set the initial state,
    items: defaultState
  };

  addItem = item => {
    this.setState({ items: [item, ...this.state.items] });
  };
  // Ideally, users are going to want to add, remove,
  // and check off items, right?

  removeItem = itemToRemove => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemToRemove.id)
    });
  };
  toggleItem = itemToToggle => {
    const items = this.state.items.map(item => {
      if (item.id !== itemToToggle.id) return item;
      return { ...itemToToggle, added: !itemToToggle.added };
    });
    this.setState({ items });
  };
  strikeThroughItem = itemToStrikeThrough => {
    const items = this.state.items.map(item => {
      if (item.id !== itemToStrikeThrough.id) return item;
      return { ...itemToStrikeThrough, picked: !itemToStrikeThrough.picked };
    });
    this.setState({ items });
  };

  render() {
    // Get the items from state
    const { items } = this.state;
    const addedItems = items.filter(item => item.added);
    const unaddedItems = items.filter(item => !item.added);
    // const pickedItems = items.filter(item => item.picked);
    // const unpickedItems = items.filter(item => !item.picked);

    return (
      <div className="Application">
        <NewItem onSubmit={this.addItem} />
        <Items
          title="Items"
          items={addedItems}
          onRemove={this.removeItem}
          onToggle={this.toggleItem}
          onStrikeThrough={this.strikeThroughItem}
        />
        <hr />
        <Items title="Default list" items={unaddedItems} onRemove={this.removeItem} onToggle={this.toggleItem} />
      </div>
    );
  }
}

export default App;
