var React = require("react");
var Default = require("../base/default");


class Albums extends React.Component {
    render() {
        const albumList = this.props.albumList.map(album => {
            return (
            <option value={album.id}>{album.title}</option>
            )      
        });
        return (
            <div className="mt-2">
            <span>add in album: </span>
            <select name="album">
                {albumList}
            </select>
            </div>
            );
    }
}


class ShowPhotos extends React.Component {
    render() {
        const photos = this.props.photos.map(photo => {
            return (
                <div className="col showphoto-col">
                    <div className="polaroid">
                        <a href={`/photos/${photo.id}`}>
                        <p>{photo.title}&nbsp;{photo.taken_date}</p>
                        <img src={photo.photo}/>
                        </a>
                    </div>
                    <form action={`/album/new/${this.props.id}`} method="post">
                        <Albums albumList={this.props.albumList}/>
                    </form>
                    <a href={`/photos/${photo.id}/edit`} className="btn btn-primary btn-sm active btn btn-outline-secondary edit-delete-button mr-1 mt-2" role="button" aria-pressed="true">edit</a>
                    <a href={`/photos/${photo.id}/delete`} className="btn btn-primary btn-sm active btn btn-secondary edit-delete-button ml-1 mt-2" role="button" aria-pressed="true">delete</a>
                </div>
                )
            });
        return (
            <Default title="photos">
            <div className="container">
                <div className="row align-items-center">
                    {photos}
                </div>
            </div>
            </Default>
        );
    }

}

module.exports = ShowPhotos;


