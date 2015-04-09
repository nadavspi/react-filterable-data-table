var React = require('react');

var TableColumn = React.createClass({
    render: function () {
        var names = this.props.data.map(function(candidate) {
            return (
                <li key={candidate.id}>{candidate.name}</li>
            );
        });

        return (
            <ul>
                {names}
            </ul>
        );
    }
});


module.exports = TableColumn;
