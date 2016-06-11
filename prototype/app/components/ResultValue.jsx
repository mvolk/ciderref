import React from "react";

class ResultValue extends React.Component {
    render() {
        return (
            <p className="h4">{this.props.value}</p>
        );
    }
}

export default ResultValue;
