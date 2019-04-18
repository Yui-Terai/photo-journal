var React = require("react");
var Default = require("../base/default");

class ShowPhotos extends React.Component {
    render() {
        const photos = this.props.photos.map(photo => {
            return (
                <div>
                    <a href={`/photos/${photo.id}`}>
                    <img src={photo.photo}/>
                    <p>{photo.title} &nbsp; {photo.taken_date}</p>
                    <a href={`/photos/${photo.id}/edit`} class="btn btn-primary btn-sm active" role="button" aria-pressed="true">edit</a>
                    <a href={`/photos/${photo.id}/delete`} class="btn btn-secondary btn-sm active" role="button" aria-pressed="true">delete</a>
                    </a>
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
