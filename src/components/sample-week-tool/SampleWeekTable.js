import React from 'react';
import PERIODS from '../../data/periods';
import CONST from '../../data/const';
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
      tableDataInstance: _.cloneDeep(this.props.tableDataModel),
      exportedTable: {}
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      tableDataInstance: _.cloneDeep(nextProps.tableDataModel)
    })
  },
  render(){
    return (
      <div>
        <div>
          <Table columns={this.generateColumns()} data={this.generateRows()} />
        </div>
        <div>
          <button type="button" onClick={this.exportTable}>Export Table!</button>
        </div>
        <div>
          <pre>
            {JSON.stringify(this.state.exportedTable, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  exportTable(){
    let result = {};
    const tableInstance = this.state.tableDataInstance;
    const numberOfDays = tableInstance[0].length;
    _.slice(tableInstance, 1).forEach(function (row) {
      for (let i = 1; i < numberOfDays; i++) {
        const day = tableInstance[0][i];
        _.set(result, ['sampleWeekTable', day, row[0]], row[i]);
      }
    });
    this.setState({exportedTable: result});
  },
  generateColumns(){
    let thiz = this; // 'this' is not the same here than inside the subsequent functions, putting a copy on scope
    return this.state.tableDataInstance[0].map(function(day){
      let columnsHeaderTemplate = {title: '', dataIndex: '', key: '', width: 150};
      if (day > CONST.dayMarker) {
        let t = _.cloneDeep(columnsHeaderTemplate);
        const dayIndexInDataModel = _.findIndex(thiz.state.tableDataInstance[0], d => d === day);
        _.set(t, 'title', day.toUpperCase());
        _.set(t, 'dataIndex', day.toUpperCase());
        _.set(t, 'key', day.toUpperCase());
        _.set(t, 'render', function (cellText, row, index) {
          return (
            <TableElement
              saveTextOnTableDataInstance={
                function () {
                  // partial function to be applied in the child component
                  return function (value) {
                    let newSampleWeekTable = _.cloneDeep(thiz.state.tableDataInstance);
                    newSampleWeekTable[index+1][dayIndexInDataModel] = value;
                    thiz.setState({
                      tableDataInstance: newSampleWeekTable
                    });
                  }
                }
              }
              elementId={index.toString()+'-'+dayIndexInDataModel.toString()}
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