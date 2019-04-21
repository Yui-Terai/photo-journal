var React = require("react");
var Default = require("../base/default");

class photosInAlbum extends React.Component {
    render() {
        const photos = this.props.photosInAlbum.map(photo => {
            return (
                <div className="col showphoto-col">
                    <div className="polaroid">
                      <p>{photo.title}&nbsp;{photo.taken_date}</p>
                      <img src={photo.photo}/>
                    </div>
                </div>
            )
        });
        return (
            <Default title="photos in album">
              <div class="container">
                <div class="row">
                  {photos}
                </div>
              </div>
            </Default>
        );
    }

}

module.exports = photosInAlbum;