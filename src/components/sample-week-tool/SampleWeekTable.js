import React from 'react';
import DAYS from '../../data/days';
import Griddle from 'griddle-react';

export default React.createClass({
  propTypes: {
    firstDay: React.PropTypes.number,
    numberOfDays: React.PropTypes.number,
    numberOfPeriods: React.PropTypes.number,
    beginningOfPeriod: React.PropTypes.string
  },
  getContent(){
    //TODO prototype, drawing the table has taken a lot of effort, leaving it like
    //TODO it is and moving on to pass props to this component
    let content = [];
    let element = {};
    DAYS.slice(0, this.props.numberOfDays).forEach(o => element[o.label] = null);
    content.push(element);
    return content;
  },
  render(){
    return (
      <div>
        <Griddle results={this.getContent()}/>
      </div>
    );
  }
});