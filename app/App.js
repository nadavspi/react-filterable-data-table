var React = require('react');
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
                property: this.props.defaultSort,
                direction: ''
            },
            filteredData: this.props.data.sort(sortBy(this.props.defaultSort)),
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
        var buttonDirectionClass = 'sort-by--' + (this.state.sortBy.direction === '' ? 'asc' : 'desc');

        var columns = this.state.dataColumns.map((column) => {
            return (
                    <th key={column.name}>
                    <h3>{column.name}</h3>
                    <input type="text" name={column.name} onChange={this.filterChange.bind(this, column.name)} value={this.state.filterQuery[column.name]} />
                    <button
                    type="button"
                onClick={this.sortBy.bind(this, column.name)}
                className={this.state.sortBy.property === column.name ? 'sort-by sort-by--active ' + buttonDirectionClass : 'sort-by'}>
                        sort
                    </button>
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
  <DataTable data={candidates.data} columns={candidates.columns} defaultSort="school" />,
  document.getElementById('app')
);
