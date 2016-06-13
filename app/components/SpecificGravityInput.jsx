import React from 'react';

export default class SpecificGravityInput extends React.Component {
  constructor(props) {
    super(props);

    var value = props.defaultValue || '1.049';
    this.state = {
      value: value
    };
    
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <input type="number" value={this.state.value} onChange={this.handleChange} autoFocus={this.isAutoFocusEnabled()} min="0.990" max="1.099" step="0.001"/>
    );
  }
  
  isAutoFocusEnabled() {
    return this.props.autoFocus || false;
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    this.props.onChange(event.target.value);
  }
}

SpecificGravityInput.propTypes = {
  defaultValue: React.PropTypes.string
};
