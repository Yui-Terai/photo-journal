var React = require("react");
var Default = require("../base/default");

class DeleteAlbum extends React.Component {
    render() {
        let albumId = this.props.deleteAlbum.id;
        let actionPath = `/album/${albumId}/?_method=delete`; 
        return (
            <Default title="delete photo">
                <form method="POST" action={actionPath}>
                <div className="d-flex flex-column align-items-center">
                    <div className="m-5">
                      <h1 className="editphoto-title">Are you sure you want to delete?</h1>
                    </div>
                    <div className="delete-albumtitle m-5">
                      <h2>{this.props.deleteAlbum.title}</h2>
                    </div>
                    <div className="editphoto-button m-5">
                      <input type="hidden" name="id" value={albumId}/>
                      <input className="btn btn-primary btn-outline-danger" type="submit" value="delete"></input>
                    </div>
                </div>
                </form>
            </Default>
        );
    }

}

module.exports = DeleteAlbum;
