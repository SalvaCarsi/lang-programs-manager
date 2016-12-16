import React from 'react';
import DAYS from '../../data/days';
import PERIODS from '../../data/periods';
import Table from 'rc-table';
import _ from 'lodash';
import 'rc-table/assets/index.css';

export default React.createClass({
  // ================= React elements and functions =================
  propTypes: {
    tableDataModel: React.PropTypes.array
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
    return this.props.tableDataModel[0].map(function (daysIndex) {
      if (daysIndex > -1) {
        let t = _.cloneDeep(columnsHeaderTemplate);
        const day = _.find(DAYS, o => o.value === daysIndex);
        _.set(t, 'title', day.label.toUpperCase());
        _.set(t, 'dataIndex', day.label.toUpperCase());
        _.set(t, 'key', day.label.toUpperCase());
        _.set(t, 'render', function () {
          return <textarea className="sample-week-table-text-area" />;
        });
        return t;
      } else {
        let emptyT = _.cloneDeep(columnsHeaderTemplate);
        _.set(emptyT, 'title', '');
        _.set(emptyT, 'dataIndex', 'period');
        _.set(emptyT, 'key', 'period');
        return emptyT;
      }
    });
  },
  generateRows(){
    return _.slice(this.props.tableDataModel, 1, this.props.tableDataModel.length).map(function (period) {
      const periodObject = _.find(PERIODS, o => o.value === period[0]);
      return _.set({}, 'period', periodObject.label.toUpperCase())
    });
  }
});