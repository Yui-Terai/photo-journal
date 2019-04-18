var React = require("react");
var Default = require("../base/default");

class ShowAllPhotos extends React.Component {
    render() {
        const photos = this.props.photosInAlbum.map(photo => {
            return (
                <div>
                    <img src={photo.photo}/>
                    <p>{photo.title} &nbsp; {photo.taken_date}</p>
                </div>
            )
        });
        return (
            <Default title="photos in album">
              {photos}
            </Default>
        );
    }

}

module.exports = ShowAllPhotos;