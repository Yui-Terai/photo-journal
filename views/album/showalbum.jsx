var React = require("react");
var Default = require("../base/default");

class ShowAlbum extends React.Component {
    render() {
        const albums = this.props.album.map(album => {
            return (
            <a href={`/album/${album.id}`}><h1>{album.title}</h1></a>
            )
        });
        return (
            <Default title="photos">
              {albums}
            </Default>
        );
    }

}

module.exports = ShowAlbum;