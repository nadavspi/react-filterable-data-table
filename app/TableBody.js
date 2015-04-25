import React from 'react';
import Addons from 'react/addons';

export default React.createClass({
  mixins: [Addons.PureRenderMixin],

  propTypes: {
    filteredData: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  render () {
    const rows = this.props.filteredData.map((candidate) => {
      return (
        <tr key={candidate.name}>
          {this.props.columns.map((column) => {
            return <td key={column.name}>{candidate[column.name]}</td>;
          })}
        </tr>
      );
    });

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
});
