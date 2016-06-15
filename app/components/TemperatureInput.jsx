import React from 'react';

export default class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <input type="number"
               value={this.props.value}
               autoFocus={this.props.autoFocus || false}
               onChange={this.handleChange}
               min={this.props.minValue || this.props.units.minValue}
               max={this.props.maxValue || this.props.units.maxValue}
               step={this.props.step || this.props.units.step}
        />
        {this.props.units.label}
      </div>
    );
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }
}
