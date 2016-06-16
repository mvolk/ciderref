import React from 'react';

export default class SpecificGravityInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <input 
        type="number"
        value={this.props.value} 
        onChange={this.handleChange} 
        autoFocus={this.props.autoFocus || false}
        min={this.props.minValue || '0.990'}
        max={this.props.maxValue || '1.100'}
        step={this.props.step || '0.001'}
      />
    );
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }
}
