var React = require("react");

class Default extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8"/>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
          <link rel="stylesheet" type="text/css" href="/style.css"/>
          <link href="https://fonts.googleapis.com/css?family=Homemade+Apple|Special+Elite|Fredericka+the+Great|Dawning+of+a+New+Day" rel="stylesheet"></link>
        </head>
        <body>
          <nav className="nav nav-default">
            <a className="nav-link" href="/">home</a>
            <a className="nav-link" href="/photos">photos</a>
            <a className="nav-link" href="/album">album</a>
          </nav>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = Default;

