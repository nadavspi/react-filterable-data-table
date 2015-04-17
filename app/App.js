var React = require('react');
var TableBody = require('./TableBody');
var candidates = require('./data');
var sortBy = require('sort-by');

var App = React.createClass({
    getInitialState () {
        var filterQuery = candidates.columns.reduce((columns, i) => {
            columns[i] = '';
            return columns;
        }, {});

        return {
            data: candidates.data,
            dataColumns: candidates.columns,
            sortBy: {
                property: 'name',
                direction: ''
            },
            filteredData: candidates.data.sort(sortBy('name')),
            filterQuery
        };
    },

    filterChange (name, e) {
        var filterQuery = this.state.filterQuery;
        filterQuery[name] = e.target.value;
        this.setState({ filterQuery }, this.filterData);
    },

    filterData () {
        var filteredIndexes = this.state.data.map((item) => {
            return this.state.dataColumns.map(property =>
                item[property].toLowerCase().
                    indexOf(this.state.filterQuery[property].toLowerCase()));
            }).map((item) => {
                return item.reduce((previous, current) => {
                    return Math.min(previous, current);
                });
            });

        var filteredData = this.state.data.filter((item, i) => {
            return filteredIndexes[i] > -1;
        }).sort(sortBy(this.state.sortBy.direction + this.state.sortBy.property));

        this.setState({ filteredData });
    },

    sortBy (property) {
        var direction = '';

        // If already sorting by the property, switch direction
        if (property === this.state.sortBy.property && this.state.sortBy.direction === '') {
            direction = '-';
        }

        this.setState({ sortBy: { property, direction } }, this.filterData);
    },

    render () {
        var columns = this.state.dataColumns.map((columnName) => {
            return (
                <th key={columnName}>
                    <h3>{columnName}</h3>
                    <input type="text" name={columnName} onChange={this.filterChange.bind(this, columnName)} value={this.state.filterQuery.columnName} />
                    <button type="button" onClick={this.sortBy.bind(this, columnName)}>sort</button>
                </th>
            );
        });

        return (
            <table className="pure-table">
                <thead>
                    <tr>
                        {columns}
                    </tr>
                </thead>
                <TableBody data={this.state.filteredData} columns={this.state.dataColumns} />
            </table>
        );
    }
});

React.render(
  <App />,
  document.getElementById('app')
);
