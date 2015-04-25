import React from 'react';

const ColumnFilterInput = React.createClass({
  render () {
    return <input type={this.props.type} name={this.props.name} onChange={this.props.handleChange} value={this.props.value} />;
  }
});

const ColumnFilterSelect = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired
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

export default React.createClass({
  propTypes: {
    type: React.PropTypes.oneOf(['text', 'email', 'select']).isRequired,
    name: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired
  },

  render () {
    let filter;
    if (this.props.type === 'text' || this.props.type === 'email') {
      filter = <ColumnFilterInput {...this.props} />;
    } else if (this.props.type === 'select') {
      filter = <ColumnFilterSelect {...this.props} />;
    }

    return (
        <div>{filter}</div>
    );
  }
});
