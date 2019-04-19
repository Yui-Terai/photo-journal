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

      <body className="home-body d-flex align-items-center">
        <nav className="nav fixed-top">
          <a className="nav-link text-white" href="/photos">photos</a>
          <a className="nav-link text-white" href="/album">album</a>
        </nav>
        <div className="container text-center">
            <h1 className="home-title">PHOTO JOURNAL</h1>
            <a href="/photos/new" class="btn btn-primary btn-lg active btn-outline-dark mr-2" role="button" aria-pressed="true">
            add photo</a>
            <a href="/album/new" class="btn btn-primary btn-lg active btn-outline-dark ml-2" role="button" aria-pressed="true">
            create album</a>
        </div>
      </body>
    </html>
    );
  }
}

module.exports = Home;
