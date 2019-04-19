var React = require("react");
var Default = require("../base/default");

class ShowAlbum extends React.Component {
    render() {
        const albums = this.props.album.map(album => {
            return (
            <div class="col-2 border border-secondary">
              <a href={`/album/${album.id}`}><h1>{album.title}</h1></a>
            </div>
            )
        });
        return (
            <Default title="photos">
            <div className="container">
                <div className="row">
                  {albums}
                </div>
            </div>
            </Default>
        );
    }

}

module.exports = ShowAlbum;