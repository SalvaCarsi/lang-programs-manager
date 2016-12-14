import React from 'react';
import DAYS from '../../data/days';
import PERIODS from '../../data/periods';
import Table from 'rc-table';
import _ from 'lodash';

export default React.createClass({
  // React elements and functions
  propTypes: {
    firstDay: React.PropTypes.number,
    numberOfDays: React.PropTypes.number,
    numberOfPeriods: React.PropTypes.number,
    beginningOfPeriod: React.PropTypes.string
  },
  render(){
    return (
      <div>
        <Table columns={this.getColumns()} data={this.getData()} />
      </div>
    );
  },
  // Helper functions
  getColumns(){
    let numberOfDays = this.props.numberOfDays === null ? 7 : this.props.numberOfDays;
    let columnsHeaderTemplate = {title: '', dataIndex: '', key: '', width: 150};
    let columns = DAYS.slice(0, numberOfDays).map(function(day) {
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
  getData(){
    return PERIODS.map(function (period) {
      let data = {};
      _.set(data, 'period', period.label.toUpperCase());
      DAYS.forEach(day => _.set(data, day.label.toLowerCase(), ''));
      return data;
    });
  }
});