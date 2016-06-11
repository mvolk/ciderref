import React from "react";

class PageHeader extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 h3 page-header">
                    <a href=""><img src="images/icon-gear-48.png" className="settings-icon" /></a>
                    <a href="guest.html"><img src="images/apple.png" className="logo-icon" />CiderRef</a>
                </div>
            </div>
        );
    }
}

export default PageHeader;
