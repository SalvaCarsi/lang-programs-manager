import React from 'react';
import DAYS from '../../data/days';
import PERIODS from '../../data/periods';
import Table from 'rc-table';
import _ from 'lodash';
import 'rc-table/assets/index.css';
import TableElement from './TableElement';

export default React.createClass({
  // ================= React elements and functions =================
  propTypes: {
    tableDataModel: React.PropTypes.array
  },
  getInitialState(){
    return {
      tableDataInstance: _.cloneDeep(this.props.tableDataModel)
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      sampleWeekTable: _.cloneDeep(nextProps.tableDataModel)
    })
  },
  render(){
    return (
      <div>
        <Table columns={this.generateColumns()} data={this.generateRows()} />
      </div>
    );
  },
  generateColumns(){
    let thiz = this; // this is not the same here than inside the subsequent functions, putting a copy on scope
    return this.state.tableDataInstance[0].map(function(dayIndex){
      let columnsHeaderTemplate = {title: '', dataIndex: '', key: '', width: 150};
      if (dayIndex > -1) {
        let t = _.cloneDeep(columnsHeaderTemplate);
        const day = _.find(DAYS, o => o.value === dayIndex);
        _.set(t, 'title', day.label.toUpperCase());
        _.set(t, 'dataIndex', day.label.toUpperCase());
        _.set(t, 'key', day.label.toUpperCase());
        _.set(t, 'render', function (cellText, row, index) {
          const rowIndex = _.findIndex(PERIODS, o => o.value === row.period.toLowerCase());
          return (
            <TableElement
              saveTextOnTableDataInstance={
                function () {
                  // partial function to be applied in the child component
                  return function (value) {
                    let newSampleWeekTable = _.cloneDeep(thiz.state.tableDataInstance);
                    newSampleWeekTable[rowIndex+1][dayIndex+1] = value;
                    thiz.setState({
                      tableDataInstance: newSampleWeekTable
                    });
                  }
                }
              }
              elementId={rowIndex.toString()+'-'+dayIndex.toString()}
            />
          );
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
    return _.slice(this.state.tableDataInstance, 1, this.state.tableDataInstance.length).map(function (period) {
      const periodObject = _.find(PERIODS, o => o.value === period[0]);
      return _.set({}, 'period', periodObject.label.toUpperCase())
    });
  }
});