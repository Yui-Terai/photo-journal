var React = require("react");
var Default = require("../base/default");

class ShowAlbum extends React.Component {
    render() {
        const albums = this.props.album.map(album => {
            return (
                <div class="square">
                  <div class="content">
                    <div class="table">
                      <div class="table-cell">
                        <a className="album-link" href={`/album/${album.id}`}><h1>{album.title}</h1></a>
                      </div>
                    </div>
                  </div>
                </div>
            )
        });
        return (
            <Default title="album">
                {albums}
            </Default>
        );
    }

}

module.exports = ShowAlbum;


