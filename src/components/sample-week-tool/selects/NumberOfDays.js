import React from 'react';
import Select from 'react-select';

const DAY_NUMBERS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' }
];

export default React.createClass({
  getInitialState() {
    return {
      selectValue: null
    }
  },
  propTypes: {
    onSelectionChange: React.PropTypes.func
  },
  updateValue (newValue) {
    this.setState({
      selectValue: newValue
    });
    this.props.onSelectionChange(newValue);
  },
  render(){
    return (
      <Select ref="numberOfDaysSelect"
              autofocus
              options={DAY_NUMBERS}
              simpleValue
              name="selected-day-number"
              value={this.state.selectValue}
              onChange={this.updateValue}
      />
      );
  }
});