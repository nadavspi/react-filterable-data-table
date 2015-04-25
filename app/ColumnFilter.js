import React from 'react';
import ColumnFilterInput from './ColumnFilterInput';
import ColumnFilterSelect from './ColumnFilterSelect';

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
