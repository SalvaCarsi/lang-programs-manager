import React from 'react';
import Select from 'react-select';

const DAY_NUMBERS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
];

export default React.createClass({
  getInitialState() {
    return {
      selectValue: null
    }
  },
  updateValue (newValue) {
    this.setState({
      selectValue: newValue
    });
  },
  render(){
    return (
      <Select ref="numberOfPeriodsSelect"
              autofocus
              options={DAY_NUMBERS}
              simpleValue
              name="selected-period-number"
              value={this.state.selectValue}
              onChange={this.updateValue}
      />
      );
  }
});