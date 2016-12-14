import React from 'react';
import FirstDay from './selects/FirstDay';
import NumberOfDays from './selects/NumberOfDays';
import NumberOfPeriods from './selects/NumberOfPeriods';
import BeginningOfPeriod from './selects/BeginningOfPeriod';
import SampleWeekTable from './SampleWeekTable';

export default React.createClass({
  getInitialState() {
    return {
      firstDay: 1,
      numberOfDays: 7,
      numberOfPeriods: 3,
      beginningOfPeriod: 'morning'
    }
  },
  changeFirstDay(n){
    this.setState({firstDay:n})
  },
  changeNumberOfDays(n){
    this.setState({numberOfDays:n})
  },
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            First day
            <FirstDay onSelectionChange={this.changeFirstDay}/>
          </div>
          <div className="col-sm-3">
            Number of days
            <NumberOfDays onSelectionChange={this.changeNumberOfDays}/>
          </div>
          <div className="col-sm-3">
            Number of periods
            <NumberOfPeriods />
          </div>
          <div className="col-sm-3">
            Beginning of the period
            <BeginningOfPeriod />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            Comments
            <SampleWeekTable
              firstDay={this.state.firstDay}
              numberOfDays={this.state.numberOfDays}
              numberOfPeriods={this.state.numberOfPeriods}
              beginningOfPeriod={this.state.beginningOfPeriod}
            />
          </div>
        </div>
      </div>
    );
  }
});