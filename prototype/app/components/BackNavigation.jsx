import React from "react";

class BackNavigation extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 h5 nav-back" onClick={this.props.onClick}>{this.props.label}</div>
            </div>
        );
    }
}

export default BackNavigation;
