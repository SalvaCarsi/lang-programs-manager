//noinspection JSUnresolvedVariable
import React, {Component} from 'react';
//TODO investigate how to get rid of noinspection JSUnresolvedVariable when import {Component}
import TemplateWizard from './components/sample-week-tool/TemplateWizard';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h2>Edit school sample week</h2>
        <TemplateWizard />
      </div>
    );
  }
}

export default App;
