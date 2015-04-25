import React from 'react';

export default React.createClass({
  propTypes: {
    type: React.PropTypes.oneOf(['text', 'email']).isRequired,
    name: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired
  },

  render () {
    return <input type={this.props.type} name={this.props.name} onChange={this.props.handleChange} value={this.props.value} />;
  }
});
