var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var TableBody = React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        data: React.PropTypes.array.isRequired,
        headers: React.PropTypes.array.isRequired
    },

    render () {
        var rows = this.props.data.map((candidate) => {
            return (
                <tr key={candidate.name}>
                    {this.props.headers.map((property) => {
                        return <td key={property}>{candidate[property]}</td>;
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
