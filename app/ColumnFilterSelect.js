import React from 'react';

export default React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired
  },

  render () {
    // Create an array of all unique values for that column then map it to an <option>
    const options = this.props.data.map((item) => {
      return item[this.props.name];
    }).filter((value, i, self) => {
      return self.indexOf(value) === i;
    }).map((option) => {
      return <option value={option} key={option}>{option}</option>;
    });

    return (
      <select name={this.props.name} onChange={this.props.handleChange}>
	<option value=""></option>
	{options}
      </select>
    );
  }
});
