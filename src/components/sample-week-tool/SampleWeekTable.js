import React from 'react';
import DAYS from '../../data/days';
import Table from 'rc-table';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    firstDay: React.PropTypes.number,
    numberOfDays: React.PropTypes.number,
    numberOfPeriods: React.PropTypes.number,
    beginningOfPeriod: React.PropTypes.string
  },
  getColumns(){
    let columnsHeaderTemplate = {title: '', dataIndex: '', key: '', width: 150};
    let columns = DAYS.slice(0, this.props.numberOfDays).map(function(element) {
      let t = _.cloneDeep(columnsHeaderTemplate);
      _.set(t, 'title', element.label.toUpperCase());
      _.set(t, 'dataIndex', element.label.toLowerCase());
      _.set(t, 'key', element.label.toLowerCase());
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
    let data = {};
    DAYS.forEach(element => _.set(data, element.label, ''));
    _.set(data, 'period', 'MORNING');
    return [data];
  },
  render(){
    return (
      <div>
        <Table columns={this.getColumns()} data={this.getData()} />
      </div>
    );
  }
});