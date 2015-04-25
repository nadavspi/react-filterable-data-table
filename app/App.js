import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import candidates from './data';
import sortBy from 'sort-by';
import Paginator from 'react-pagify';

const DataTable = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    defaultSort: React.PropTypes.string.isRequired
  },

  getInitialState () {
    // Create an object with column names as keys
    const filterQuery = this.props.columns.map(column => column.name)
      .reduce((columns, i) => {
        columns[i] = '';
        return columns;
      }, {});

    return {
      sortBy: {
        column: this.props.defaultSort,
        direction: ''
      },
      filteredData: this.props.data.sort(sortBy(this.props.defaultSort)),
      filterQuery,
      pagination: {
        page: 0,
        perPage: 10
      }
    };
  },

  handleFilter (filterQuery) {
    this.setState({ filterQuery }, this.filterData);
  },

  handleFilterReset () {
    // doesn't clear select filters
    this.setState({ filterQuery: this.getInitialState().filterQuery }, this.filterData);
  },

  filterData () {
    const filteredIndexes = this.props.data.map((item) => {
      return this.props.columns.map(column =>
        item[column.name].toLowerCase().
        indexOf(this.state.filterQuery[column.name].toLowerCase()));
      }).map((item) => {
        return item.reduce((previous, current) => {
          return Math.min(previous, current);
        });
    });

    const filteredData = this.props.data.filter((item, i) => {
      return filteredIndexes[i] > -1;
    }).sort(sortBy(this.state.sortBy.direction + this.state.sortBy.column));

    this.setState({ filteredData });
  },

  handleSort (column) {
    let direction = '';

    // If already sorting by the column, switch direction
    if (this.state.sortBy.column === column.name && this.state.sortBy.direction === '') {
      direction = '-';
    }

    this.setState({ sortBy: { column: column.name, direction } }, this.filterData);
  },

  handlePagination (page) {
    const { pagination } = this.state;
    pagination.page = page;
    this.setState({ pagination });
  },

  render () {
    const paginated = Paginator.paginate(this.state.filteredData, this.state.pagination);

    return (
      <table className="pure-table">
        <TableHead
          data={this.props.data}
          columns={this.props.columns}
          filterQuery={this.state.filterQuery}
          handleFilter={this.handleFilter}
          sortBy={this.state.sortBy}
          handleSort={this.handleSort} />
        <TableBody
          filteredData={paginated.data}
          columns={this.props.columns} />
        <tfoot>
          <Paginator
            page={paginated.page}
            pages={paginated.amount}
            beginPages={3}
            endPages={3}
            onSelect={this.handlePagination} />
            <button onClick={this.handleFilterReset}>Reset filters</button>
        </tfoot>
      </table>
    );
  }
});

React.render(
  <DataTable data={candidates.data} columns={candidates.columns} defaultSort="school" />,
  document.getElementById('app')
);
