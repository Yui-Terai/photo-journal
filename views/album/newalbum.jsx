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
            <div className="newalbum-container">
                <h1>create a new album</h1>
                <form action="/album" method="post">
                title: <input type="text" name="title"/>
                <br/>
                <h2>select photos</h2>
                <div>
                    <ul>
                    {photos}
                    </ul>
                </div>
                <input type="submit" value="create"></input>
                </form>
            </div>
            </Default>
        );
    }

}

module.exports = NewAlbum;
