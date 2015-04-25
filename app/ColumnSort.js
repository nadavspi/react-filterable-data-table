import React from 'react';

export default React.createClass({
  propTypes: {
    handleSort: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    sortBy: React.PropTypes.object.isRequired
  },

  render () {
    let className = 'sort-by';
    const buttonDirectionClass = 'sort-by--' + (this.props.sortBy.direction === '' ? 'asc' : 'desc');
    if (this.props.sortBy.column === this.props.name) {
      className = 'sort-by sort-by--active ' + buttonDirectionClass;
    }

    return (
      <button
	type="button"
	onClick={this.props.handleSort}
	className={className}
      >
	Sort
      </button>
    );
  }
});
