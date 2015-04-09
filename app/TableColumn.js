var React = require('react');

var TableColumn = React.createClass({
    getInitialState () {
        return {
            candidates: this.props.data,
            filter: ''
        };
    },

    filterChange (e) {
        if (!e.target.value) {
            this.setState({ filter: '' });
        } else {
            this.setState({ filter: e.target.value });
        }

        this.filterCandidates(e.target.value);
    },

    filterCandidates (filterFor) {
        var filtered = this.props.data.filter((candidate) => {
            return candidate[this.props.name].toLowerCase().indexOf(filterFor.toLowerCase()) > -1;
        });

        this.setState({
            candidates: filtered
        });
    },

    render () {
        var results = this.state.candidates.map((candidate) => {
            return (
                    <li key={candidate.id}>{candidate[this.props.name]}</li>
            );
        });

        return (
            <div>
                <input type="text" onChange={this.filterChange} value={this.state.filter} ref="nameFilter"/>
                <ul>
                    {results}
                </ul>
                <p>{this.state.candidates.length} of {this.props.data.length}</p>
            </div>
        );
    }
});


module.exports = TableColumn;
