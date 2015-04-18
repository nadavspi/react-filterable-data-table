var React = require('react');
var ColumnFilter = require('./ColumnFilter');
var ColumnSort = require('./ColumnSort');

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
        return (
                <thead>
                {
                    this.props.columns.map((column) => {
                        return (
                                <th key={column.name}>
                                <h3>{column.label || column.name}</h3>
                                <ColumnFilter data={this.props.data} type={column.type} name={column.name} handleChange={this.handleFilterChange.bind(this, column)} value={this.props.filterQuery[column.name]} />
                                <ColumnSort name={column.name} handleSort={this.props.handleSort.bind(null, column)} sortBy={this.props.sortBy} />
                                </th>
                        );
                    })
                }
            </thead>
        );
    }
});

module.exports = TableHead;
