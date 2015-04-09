var React = require('react');
var Table = require('./Table');
var candidates = require('./data');


var App = React.createClass({
    getInitialState () {
        return {
            data: candidates.data,
            filteredData: candidates.data,
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
        console.log(this.state);
        var filteredData = this.state.data.filter((item) => {
            return (
                item.name.toLowerCase().indexOf(this.state.filterQuery.name.toLowerCase()) > -1 &&
                    item.website.toLowerCase().indexOf(this.state.filterQuery.website.toLowerCase()) > -1
            );
        });

        this.setState({ filteredData });
    },

    render () {
        return (
            <div>
                <input type="text" name="name" onChange={this.filterChange.bind(this, 'name')} value={this.state.filterQuery.name} />
                <input type="text" name="website" onChange={this.filterChange.bind(this, 'website')} value={this.state.filterQuery.website} />
                <Table headers={candidates.headers} data={this.state.filteredData} />
            </div>
        );
    }
});

React.render(
  <App />,
  document.getElementById('app')
);
