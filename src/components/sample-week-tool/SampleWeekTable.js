import React from 'react';
import DAYS from '../../data/days';
import PERIODS from '../../data/periods';
import Table from 'rc-table';
import _ from 'lodash';

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
    // let numberOfPeriods = this.props.numberOfPeriods === null ? 7 : this.props.numberOfPeriods;
    // let beginningOfPeriod = this.props.beginningOfPeriod === null ? 0 : this.props.beginningOfPeriod;
    return PERIODS.map(function (period) {
      let data = {};
      _.set(data, 'period', period.label.toUpperCase());
      DAYS.forEach(day => _.set(data, day.label.toLowerCase(), ''));
      return data;
    });
  }
});