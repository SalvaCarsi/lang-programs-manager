import React from 'react';

export default React.createClass({
  // ================= React elements and functions =================
  propTypes: {
    saveTextOnTableDataInstance: React.PropTypes.func,
    elementId: React.PropTypes.string
  },
  getInitialState(){
    return {
      value: null
    }
  },
  saveText(){
    this.props.saveTextOnTableDataInstance()(this.state.value)
  },
  saveValue(){
    const v = document.getElementById(this.getElementId()).value;
    this.setState({value: v});
  },
  getElementId(){
    return 'table-elem-'+this.props.elementId;
  },
  render(){
    return (
      <div>
        <textarea id={this.getElementId()} onBlur={this.saveText} onKeyUp={this.saveValue} />
      </div>
    );
  },
});