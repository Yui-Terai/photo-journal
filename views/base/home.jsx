var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
      <head>
        <title>home</title>
        <meta charSet="utf-8"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
        <link href="https://fonts.googleapis.com/css?family=Reenie+Beanie|Sacramento|Special+Elite" rel="stylesheet"></link>
      </head>

      <body className="home-body">
        <nav class="nav">
          <a class="nav-link text-white" href="#">photos</a>
          <a class="nav-link text-white" href="#">album</a>
        </nav>
        <div class="container" role="main">
            <div class="center-block text-center">
              <h1>PHOTO JOURNAL</h1>
              <button type="button" class="btn btn-primary   btn-lg btn-outline-light">add photo</button>
              <button type="button" class="btn btn-secondary btn-lg btn-outline-light">create album</button>
            </div>
        </div>
      </body>
    </html>
    );
  }
}

module.exports = Home;

