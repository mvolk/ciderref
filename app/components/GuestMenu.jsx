import React from 'react';
import NavigationHeader from './NavigationHeader.jsx';
import NavigationItem from './NavigationItem.jsx';

export default class GuestMenu extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <NavigationHeader label="Calculators:"/>
        <NavigationItem label="Hydrometer Correction" onClick={this.props.onHydrometerCorrectionClick}/>
        <NavigationItem label="Sulphite Treatment" onClick={this.handleClickNoOp}/>
        <NavigationItem label="Chaptalization" onClick={this.handleClickNoOp}/>
        <NavigationItem label="Backsweetening" onClick={this.handleClickNoOp}/>
        <NavigationHeader label="Recipes:"/>
        <NavigationItem label="5% Sulphite Solution" onClick={this.handleClickNoOp}/>
      </div>
    );
  }

  handleClickNoOp() {
    window.alert('not implemented');
  }
}
