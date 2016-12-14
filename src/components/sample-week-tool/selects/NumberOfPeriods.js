import React from 'react';
import Select from 'react-select';

const NUMBER_OF_PERIODS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
];

export default React.createClass({
  propTypes: {
    onSelectionChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      selectValue: null
    }
  },
  updateValue (newValue) {
    this.setState({
      selectValue: newValue
    });
    this.props.onSelectionChange(newValue);
  },
  render(){
    return (
      <Select ref="numberOfPeriodsSelect"
              autofocus
              options={NUMBER_OF_PERIODS}
              simpleValue
              name="selected-period-number"
              value={this.state.selectValue}
              onChange={this.updateValue}
      />
      );
  }
});