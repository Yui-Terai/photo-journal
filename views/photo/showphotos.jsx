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
            <div className="mt-2 ml-2">
            <span className="add-in-album-span">add in album: </span>
            <select className="album-list" id={this.props.photoId}>
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
                    <form action={`/album/add/${photo.id}`} method="post">
                        <Albums albumList={this.props.albumList} photoId={photo.id}/>
                    </form>
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


