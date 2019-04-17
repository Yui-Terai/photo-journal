var React = require("react");
var Default = require("../base/default");

class ShowAlbum extends React.Component {
    render() {
        const albums = this.props.album.map(album => {
            return (
            <h1>{album.title}</h1>
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