import React from 'react';
import DAYS from '../../data/days';
import PERIODS from '../../data/periods';
import Table from 'rc-table';
// import MyTable from './MyTable';
import _ from 'lodash';
import 'rc-table/assets/index.css';

export default React.createClass({
  // ================= React elements and functions =================
  propTypes: {
    firstDay: React.PropTypes.number,
    numberOfDays: React.PropTypes.number,
    numberOfPeriods: React.PropTypes.number,
    beginningOfPeriod: React.PropTypes.string
  },
  render(){
    return (
      <div>
        <Table columns={this.generateColumns()} data={this.generateRows()} />
        {/*<MyTable columns={this.generateColumns()} data={this.generateRows()} />*/}
      </div>
    );
  },
  // ================= Helper functions =================
  generateColumns(){
    let columnsHeaderTemplate = {title: '', dataIndex: '', key: '', width: 150};
    let numberOfDays = this.props.numberOfDays === null ? 7 : this.props.numberOfDays;
    let firstDay = this.props.firstDay === null ? 0 : this.props.firstDay;
    // building a new DAYS array, where the first element is not Sunday but the one chosen by the user
    let daysRebuild = _.concat([], _.slice(DAYS, firstDay), _.take(DAYS, firstDay));

    let columns = daysRebuild.slice(0, numberOfDays).map(function(day) {
      let t = _.cloneDeep(columnsHeaderTemplate);
      _.set(t, 'title', day.label.toUpperCase());
      _.set(t, 'dataIndex', day.label.toLowerCase());
      _.set(t, 'key', day.label.toLowerCase());
      _.set(t, 'render', function (a) {
        return <input type="text" className="table-field" />;
      });
      return t;
    });
    let emptyT = _.cloneDeep(columnsHeaderTemplate);
    _.set(emptyT, 'title', '');
    _.set(emptyT, 'dataIndex', 'period');
    _.set(emptyT, 'key', 'period');
    columns.unshift(emptyT);

    return columns;
  },
  generateRows(){
    const morningPeriod = PERIODS[0];
    const afternoonPeriod = PERIODS[1];
    const eveningPeriod = PERIODS[2];
    const fullDayPeriod = PERIODS[3];
    const numberOfPeriods = this.props.numberOfPeriods === null ? 3 : this.props.numberOfPeriods;
    const beginningOfPeriod = this.props.beginningOfPeriod === null ? morningPeriod.value : this.props.beginningOfPeriod;

    let rows = [];
    switch (beginningOfPeriod) {
      case morningPeriod.value:
        switch (numberOfPeriods) {
          case 3: rows.unshift(_.set({}, 'period', eveningPeriod.label.toUpperCase())); // falls through
          case 2: rows.unshift(_.set({}, 'period', afternoonPeriod.label.toUpperCase())); // falls through
          case 1: rows.unshift(_.set({}, 'period', morningPeriod.label.toUpperCase())); // falls through
          default: break;
        }
        break;
      case afternoonPeriod.value:
        switch (numberOfPeriods) {
          case 3:
          case 2: rows.unshift(_.set({}, 'period', eveningPeriod.label.toUpperCase())); // falls through
          case 1: rows.unshift(_.set({}, 'period', afternoonPeriod.label.toUpperCase())); // falls through
          default: break;
        }
        break;
      case eveningPeriod.value:
        switch (numberOfPeriods) {
          case 3: // falls through
          case 2: // falls through
          case 1: rows.unshift(_.set({}, 'period', eveningPeriod.label.toUpperCase())); // falls through
          default: break;
        }
        break;
      case fullDayPeriod.value:
        switch (numberOfPeriods) {
          case 3: // falls through
          case 2: // falls through
          case 1: rows.unshift(_.set({}, 'period', fullDayPeriod.label.toUpperCase())); // falls through
          default: break;
        }
        break;
      default: break;
    }
    return rows;
  }
});