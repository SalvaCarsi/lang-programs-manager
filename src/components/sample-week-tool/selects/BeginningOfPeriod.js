import React from 'react';
import Select from 'react-select';
import PERIODS from '../../../data/periods';

export default React.createClass({
  propTypes: {
    onSelectionChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      selectValue: PERIODS[0].value
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
      <Select ref="beginningOfPeriodSelect"
              autofocus
              options={PERIODS}
              simpleValue
              name="selected-beginning-of-period"
              value={this.state.selectValue}
              onChange={this.updateValue}
              clearable={false}
      />
      );
  }
});