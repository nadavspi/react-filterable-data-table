var React = require('react');
var TableHead = require('./TableHead');
var TableBody = require('./TableBody');
var candidates = require('./data');
var sortBy = require('sort-by');

var DataTable = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired,
        columns: React.PropTypes.array.isRequired,
        defaultSort: React.PropTypes.string.isRequired
    },

    getInitialState () {
        var filterQuery = this.props.columns.map(column => column.name)
                .reduce((columns, i) => {
                    columns[i] = '';
                    return columns;
                }, {});

        return {
            data: this.props.data,
            dataColumns: this.props.columns,
            sortBy: {
                column: this.props.defaultSort,
                direction: ''
            },
            filteredData: this.props.data.sort(sortBy(this.props.defaultSort)),
            filterQuery
        };
    },

    handleFilter (filterQuery) {
        this.setState({ filterQuery }, this.filterData);
    },

    filterData () {
        var filteredIndexes = this.state.data.map((item) => {
            return this.state.dataColumns.map(column =>
                item[column.name].toLowerCase().
                    indexOf(this.state.filterQuery[column.name].toLowerCase()));
            }).map((item) => {
                return item.reduce((previous, current) => {
                    return Math.min(previous, current);
                });
            });

        var filteredData = this.state.data.filter((item, i) => {
            return filteredIndexes[i] > -1;
        }).sort(sortBy(this.state.sortBy.direction + this.state.sortBy.column));

        this.setState({ filteredData });
    },

        handleSort (column) {
        var direction = '';

        // If already sorting by the column, switch direction
        if (this.state.sortBy.column === column.name && this.state.sortBy.direction === '') {
            direction = '-';
        }

        this.setState({ sortBy: { column: column.name, direction } }, this.filterData);
    },

    render () {
        return (
            <table className="pure-table">
                <TableHead
                    data={this.props.data}
                    columns={this.state.dataColumns}
                    filterQuery={this.state.filterQuery}
                    handleFilter={this.handleFilter}
                    sortBy={this.state.sortBy}
                    handleSort={this.handleSort}
                />
                <TableBody
                    filteredData={this.state.filteredData}
                    columns={this.state.dataColumns}
                />
            </table>
        );
    }
});

React.render(
  <DataTable data={candidates.data} columns={candidates.columns} defaultSort="school" />,
  document.getElementById('app')
);
