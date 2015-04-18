var React = require('react');

var ColumnFilterInput = React.createClass({
    render () {
        return <input type={this.props.type} name={this.props.name} onChange={this.props.handleChange} value={this.props.value} />;
    }
});

var ColumnFilterSelect = React.createClass({
    render () {
        return (
            <select name={this.props.name} onChange={this.props.handleChange}>
                <option value="Cx">Cx</option>
                <option value="D">D</option>
            </select>
        );
    }
});

var ColumnFilter = React.createClass({
    propTypes: {
        type: React.PropTypes.oneOf(['text', 'email', 'select']).isRequired,
        name: React.PropTypes.string.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string.isRequired
    },

    render () {
        var filter;
        if (this.props.type === 'text' || this.props.type === 'email') {
            filter = <ColumnFilterInput {...this.props} />;
        } else if (this.props.type === 'select') {
            filter = <ColumnFilterSelect {...this.props} />;
        }

        return (
            <div>{filter}</div>
        );
    }
});

module.exports = ColumnFilter;
