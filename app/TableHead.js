var React = require('react');
var ColumnFilter = require('./ColumnFilter');

var TableHead = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired,
        columns: React.PropTypes.array.isRequired,
        filterQuery: React.PropTypes.object.isRequired,
        handleSort: React.PropTypes.func.isRequired,
        sortBy: React.PropTypes.object.isRequired,
        handleFilter: React.PropTypes.func.isRequired
    },

    handleFilterChange (column, e) {
        var filterQuery = this.props.filterQuery;
        filterQuery[column.name] = e.target.value;
        this.props.handleFilter(filterQuery);
    },

    render () {
        var buttonDirectionClass = 'sort-by--' + (this.props.sortBy.direction === '' ? 'asc' : 'desc');

        return (
                <thead>
                {
                    this.props.columns.map((column) => {
                        return (
                                <th key={column.name}>
                                <h3>{column.label || column.name}</h3>
                                <ColumnFilter data={this.props.data} type={column.type} name={column.name} handleChange={this.handleFilterChange.bind(this, column)} value={this.props.filterQuery[column.name]} />
                                <button
                            type="button"
                            onClick={this.props.handleSort.bind(null, column)}
                            className={this.props.sortBy.column === column.name ? 'sort-by sort-by--active ' + buttonDirectionClass : 'sort-by'}
                                >
                                sort
                            </button>
                                </th>
                        );
                    })
                }
            </thead>
        );
    }
});

module.exports = TableHead;
