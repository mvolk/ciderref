import React from 'react';
import PageHeader from './PageHeader.jsx';
import NavigationHeader from './NavigationHeader.jsx';
import NavigationItem from './NavigationItem.jsx';
import PageFooter from './PageFooter.jsx';

export default class GuestMenu extends React.Component {
  render() {
    return (
      <div className="container">
        <PageHeader onRequestHome={this.props.onRequestHome} onOpenSettings={this.props.onOpenSettings} />
        <NavigationHeader label="Calculators:"/>
        <NavigationItem label="Hydrometer Correction" onClick={this.props.onHydrometerCorrectionClick}/>
        <NavigationItem label="Sulphite Treatment" onClick={this.handleClickNoOp}/>
        <NavigationItem label="Chaptalization" onClick={this.handleClickNoOp}/>
        <NavigationItem label="Backsweetening" onClick={this.handleClickNoOp}/>
        <NavigationHeader label="Recipes:"/>
        <NavigationItem label="5% Sulphite Solution" onClick={this.handleClickNoOp}/>
        <PageFooter />
      </div>
    );
  }

  handleClickNoOp() {
    window.alert('not implemented');
  }
}
