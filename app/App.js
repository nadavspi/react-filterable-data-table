var React = require('react');
var TableHead = require('./TableHead');
var TableBody = require('./TableBody');
var candidates = require('./data');
var sortBy = require('sort-by');

var App = React.createClass({
    getInitialState () {
        return {
            data: candidates.data,
            sortBy: 'name',
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
        }).sort(sortBy(this.state.sortBy));
        console.log('filterdata');
        console.log(this.state.sortBy);

        this.setState({ filteredData });
    },

    sortBy (property) {
        console.log(property);
        this.setState({ sortBy: property }, this.filterData);
    },

    render () {
        return (
            <div>
                <input type="text" name="name" onChange={this.filterChange.bind(this, 'name')} value={this.state.filterQuery.name} />
                <input type="text" name="website" onChange={this.filterChange.bind(this, 'website')} value={this.state.filterQuery.website} />
                <button type="button" onClick={this.sortBy.bind(this, 'name')}>name</button>
                <button type="button" onClick={this.sortBy.bind(this, 'website')}>website</button>
                <table>
                    <TableHead headers={candidates.headers} />
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
