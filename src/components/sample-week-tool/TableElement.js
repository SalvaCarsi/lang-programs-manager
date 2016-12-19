import React from 'react';

export default React.createClass({
  // ================= React elements and functions =================
  propTypes: {
    saveTextOnTableDataInstance: React.PropTypes.func
  },
  getInitialState(){
    return {
      value: 'hola'
    }
  },
  saveText(){
    this.props.saveTextOnTableDataInstance()(this.state.value)
  },
  render(){
    return (
      <div>
        <textarea onBlur={this.saveText} />
      </div>
    );
  },
});