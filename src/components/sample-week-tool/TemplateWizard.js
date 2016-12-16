import React from 'react';
import FirstDay from './selects/FirstDay';
import NumberOfDays from './selects/NumberOfDays';
import NumberOfPeriods from './selects/NumberOfPeriods';
import BeginningOfPeriod from './selects/BeginningOfPeriod';
import SampleWeekTable from './SampleWeekTable';
import DAYS from '../../data/days';
import PERIODS from '../../data/periods';
import _ from 'lodash';

export default React.createClass({
  // ================= React elements and functions =================
  getInitialState() {
    return {
      firstDay: 0,
      numberOfDays: 7,
      numberOfPeriods: 3,
      beginningOfPeriod: PERIODS[0].value
    }
  },
  changeFirstDay(n){
    this.setState({firstDay:n})
  },
  changeNumberOfDays(n){
    this.setState({numberOfDays:n})
  },
  changeNumberOfPeriods(n){
    this.setState({numberOfPeriods:n})
  },
  changeBeginningOfPeriod(n){
    this.setState({beginningOfPeriod:n})
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
            <NumberOfPeriods onSelectionChange={this.changeNumberOfPeriods}/>
          </div>
          <div className="col-sm-3">
            Beginning of the period
            <BeginningOfPeriod onSelectionChange={this.changeBeginningOfPeriod}/>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            Comments
            <SampleWeekTable tableDataModel={this.generateTableDataModel()} />
          </div>
        </div>
      </div>
    );
  },
  // ================= Helper functions =================
  generateTableDataModel(){
    let numberOfDays = this.state.numberOfDays + 1;
    let firstRow = this.generateFirstRow();
    let rows = this.generateSubsequentRows().map(function (e) {
      let row = new Array(numberOfDays);
      _.fill(row, null);
      row[0] = e;
      return row;
    });
    rows.unshift(firstRow);
    return rows;
  },
  generateFirstRow(){
    // building a new DAYS array, where the first element is not Sunday but the one chosen by the user
    const firstDay = this.state.firstDay;
    let daysRebuild = _.concat([], _.slice(DAYS, firstDay), _.take(DAYS, firstDay));
    let columns = daysRebuild.slice(0, this.state.numberOfDays).map(e => e.value);
    columns.unshift(-1);
    return columns;
  },
  generateSubsequentRows(){
    const morningPeriod = PERIODS[0];
    const afternoonPeriod = PERIODS[1];
    const eveningPeriod = PERIODS[2];
    const fullDayPeriod = PERIODS[3];

    let rows = [];
    switch (this.state.beginningOfPeriod) {
      case morningPeriod.value:
        switch (this.state.numberOfPeriods) {
          case 3: rows.unshift(eveningPeriod.value); // falls through
          case 2: rows.unshift(afternoonPeriod.value); // falls through
          case 1: rows.unshift(morningPeriod.value); // falls through
          default: break;
        }
        break;
      case afternoonPeriod.value:
        switch (this.state.numberOfPeriods) {
          case 3:
          case 2: rows.unshift(eveningPeriod.value); // falls through
          case 1: rows.unshift(afternoonPeriod.value); // falls through
          default: break;
        }
        break;
      case eveningPeriod.value:
        switch (this.state.numberOfPeriods) {
          case 3: // falls through
          case 2: // falls through
          case 1: rows.unshift(eveningPeriod.value); // falls through
          default: break;
        }
        break;
      case fullDayPeriod.value:
        switch (this.state.numberOfPeriods) {
          case 3: // falls through
          case 2: // falls through
          case 1: rows.unshift(fullDayPeriod.value); // falls through
          default: break;
        }
        break;
      default: break;
    }
    return rows;
  }
});