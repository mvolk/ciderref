import React from 'react';

export default class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);

    var value = this.props.defaultValue || '15';
    this.state = {
      value: value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <input type="number" value={this.state.value} onChange={this.handleChange} min="0" max="100" step="1"/> &deg;C
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    this.props.onChange(event.target.value);
  }
}
