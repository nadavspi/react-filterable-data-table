var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var TableBody = React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        data: React.PropTypes.array.isRequired,
        columns: React.PropTypes.array.isRequired
    },

    render () {
        var rows = this.props.data.map((candidate) => {
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


module.exports = TableBody;
