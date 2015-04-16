var React = require('react');
var TableHead = require('./TableHead');
var TableBody = require('./TableBody');
var candidates = require('./data');
var sortBy = require('sort-by');

var App = React.createClass({
    getInitialState () {
        return {
            data: candidates.data,
            sortBy: {
                property: 'name',
                direction: ''
            },
            filteredData: candidates.data.sort(sortBy('name')),
            filterQuery: {
                name: '',
                website: ''
            }
        };
    },

    filterChange (name, e) {
        var filterQuery = this.state.filterQuery;
        filterQuery[name] = e.target.value;
        this.setState({ filterQuery }, this.filterData);
    },

    filterData () {
        var filteredData = this.state.data.filter((item) => {
            return (
                item.name.toLowerCase().indexOf(this.state.filterQuery.name.toLowerCase()) > -1 &&
                    // item[x].toLowerCase().indexOf(this.state.filterQuery.name.toLowerCase()) > -1 &&
                    item.website.toLowerCase().indexOf(this.state.filterQuery.website.toLowerCase()) > -1
            );
        }).sort(sortBy(this.state.sortBy.direction + this.state.sortBy.property));
        console.log(this.state.sortBy);

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
        var headers = candidates.headers.map((columnName) => {
            return (
                <th key={columnName}>
                    <h3>{columnName}</h3>
                    <input type="text" name={columnName} onChange={this.filterChange.bind(this, columnName)} value={this.state.filterQuery.columnName} />
                    <button type="button" onClick={this.sortBy.bind(this, columnName)}>sort</button>
                </th>
            );
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <TableBody data={this.state.filteredData} />
                </table>
            </div>
        );
    }
});

React.render(
  <App />,
  document.getElementById('app')
);
