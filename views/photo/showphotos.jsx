var React = require("react");
var Default = require("../base/default");

class ShowPhotos extends React.Component {
    render() {
        const photos = this.props.photos.map(photo => {
            return (
                <div>
                    <img src={photo.photo}/>
                    <p>{photo.title} &nbsp; {photo.taken_date}</p>
                </div>
                )
            });
        return (
            <Default title="photos">
              {photos}
            </Default>
        );
    }

}

module.exports = ShowPhotos;
