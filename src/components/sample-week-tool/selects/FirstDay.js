import React from 'react';
import Select from 'react-select';
import DAYS from '../../../data/days';

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
      <Select ref="daySelect"
              autofocus
              options={DAYS}
              simpleValue
              name="selected-day"
              value={this.state.selectValue}
              onChange={this.updateValue}
      />
      );
  }
});