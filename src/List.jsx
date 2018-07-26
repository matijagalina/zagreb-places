import React, { Component } from 'react';

class List extends Component {
  render() {

    return (
      <div className='list-container'>
        <ul className='list'>
          {
            this.props.items.map(item => (
              <li className="list-item" key={item.id}>{item.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default List;