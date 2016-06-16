const temperature = {
  celsius: {
    key: 'celsius',
    name: 'Celsius',
    label: String.fromCharCode(176) + 'C',
    minValue: 0,
    maxValue: 100,
    step: 0.1,
    toReference: (temperature) => {
      return temperature;
    },
    fromReference: (temperature) => {
      return temperature;
    }
  },
  fahrenheit: {
    key: 'fahrenheit',
    name: 'Fahrenheit',
    label: String.fromCharCode(176) + 'F',
    minValue: 32,
    maxValue: 212,
    step: 1,
    toReference: (temperature) => {
      // round to nearest tenth of a reference degree (celsius)
      return Math.round((temperature - 32) * 5 / 9 * 10) / 10;
    },
    fromReference: (temperature) => {
      // round to the nearest whole degree (fahrenheit)
      return Math.round(((temperature * 9 / 5) + 32));
    }
  }
};

export { temperature };