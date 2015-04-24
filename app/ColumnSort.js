var React = require('react');

var ColumnSort = React.createClass({
    propTypes: {
        handleSort: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        sortBy: React.PropTypes.object.isRequired
    },

    render () {
        var buttonDirectionClass = 'sort-by--' + (this.props.sortBy.direction === '' ? 'asc' : 'desc');

        return (
                <button
                    type="button"
                    onClick={this.props.handleSort}
                    className={this.props.sortBy.column === this.props.name ? 'sort-by sort-by--active ' + buttonDirectionClass : 'sort-by'}
                >
                    Sort
                </button>
        );
    }
});

module.exports = ColumnSort;
