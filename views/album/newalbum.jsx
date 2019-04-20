var React = require("react");
var Default = require("../base/default");

class NewAlbum extends React.Component {
    render() {
        const photos = this.props.photos.map(photo => {
            let checkBoxId = `cb${photo.id}`;
            let connectLabel = `cb${photo.id}`;
            let photoId = photo.id;
            return (
                 <li>
                    <input type="checkbox" name="photoArray" value={photoId} id={checkBoxId}/>
                    <label for={connectLabel}><img src={photo.photo}/></label>
                </li>
                )
            });
            return (
            <Default title="create album">
              <h1 className="newalbum-title text-center mt-5">create a new album</h1>
              <form action="/album" method="post">
              <p className="albumtitle-form mt-4 mb-3">
                title: <input className="newalbum-input" type="text" name="title"/>
              </p>
              <p className="newalbum-h4 mb-0">select photos:</p>
              <div className="selectphoto-container text-center">
                <ul>
                {photos}
                </ul>
              </div>
              <div className="createalbum-button text-center">
                <input className="newalbum-button btn btn-primary btn btn-outline-dark text-center" type="submit" value="create"></input>
              </div>
              </form>
            </Default>
        );
    }

}

module.exports = NewAlbum;
