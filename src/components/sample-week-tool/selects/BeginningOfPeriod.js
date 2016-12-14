import React from 'react';
import Select from 'react-select';
import PERIODS from '../../../data/periods';

export default React.createClass({
  getInitialState() {
    return {
      selectValue: ''
    }
  },
  updateValue (newValue) {
    this.setState({
      selectValue: newValue
    });
  },
  render(){
    return (
      <Select ref="beginningOfPeriodSelect"
              autofocus
              options={PERIODS}
              simpleValue
              name="selected-beginning-of-period"
              value={this.state.selectValue}
              onChange={this.updateValue}
      />
      );
  }
});