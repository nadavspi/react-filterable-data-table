var React = require('react');

var Table = React.createClass({
    propTypes: {
        headers: React.PropTypes.array.isRequired,
        data: React.PropTypes.array.isRequired
    },

    render () {
        var headers = this.props.headers.map((header) => {
            return (
                <th key={header}>
                    {header}
                </th>
            );
        });

        var rows = this.props.data.map((candidate) => {
            return (
                <tr key={candidate.id}>
                    <td>{candidate.name}</td>
                    <td>{candidate.website}</td>
                </tr>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});


module.exports = Table;
