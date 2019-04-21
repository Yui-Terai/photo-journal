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
                    <a href={`/album/${album.id}/edit`} className="btn btn-primary btn-sm active btn btn-outline-light edit-delete-button mr-1" role="button" aria-pressed="true">edit</a>
                    <a href={`/album/${album.id}/delete`} className="btn btn-primary btn-sm active btn btn-light edit-delete-button ml-1" role="button" aria-pressed="true">delete</a>
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


