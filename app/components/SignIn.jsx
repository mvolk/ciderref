import React from 'react';

export default class SignIn extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 visible-xs" style={{height: '50px'}}></div>
        </div>
        <div className="row">
          <div className="col-md-12" style={{height: '300px'}}>
            <h1 className="text-center">CiderRef</h1>
            <img src="images/apple.png" width="125" height="125" style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} />
              <h4 className="text-center"><em>Hard cider made easy</em></h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 text-center h4 enter-btn">Sign In</div>
          <div className="col-md-1"></div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 text-center h4 enter-btn">Register</div>
          <div className="col-md-1"></div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 text-center h4 enter-btn" onClick={this.props.onRequestGuest}>Guest</div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}
