var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var TableHead = React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        headers: React.PropTypes.array.isRequired
    },

    render () {
        var headers = this.props.headers.map((header) => {
            return (
                <th key={header}>
                    {header}
                </th>
            );
        });

        return (
            <thead>
                {headers}
            </thead>
        );
    }
});


module.exports = TableHead;
