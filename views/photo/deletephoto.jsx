var React = require("react");
var Default = require("../base/default");

class DeletePhoto extends React.Component {
    render() {
        let photoId = this.props.deletePhoto.id;
        let actionPath = `/photos/${photoId}/?_method=delete`; 
        return (
            <Default title="delete photo">
            <h1 className="editphoto-title text-center m-5">Are you sure you want to delete?</h1>
            <form method="POST" action={actionPath}>
                <div className="d-flex flex-row justify-content-center">
                    <div className="editphoto-img mr-1"> 
                        <img src={this.props.deletePhoto.photo}/>
                    </div>
                    <div className="deletephoto-form ml-1">
                        <h3 className="deletephoto-h3-p">
                        <b>{this.props.deletePhoto.title}</b>
                        </h3>
                        <p className="deletephoto-h3-p">
                        {this.props.deletePhoto.taken_date}
                        </p>
                        <p className="deletephoto-h3-p">
                        {this.props.deletePhoto.location}
                        </p>
                        <p className="deletephoto-capture">
                        {this.props.deletePhoto.capture}
                        </p> 
                    </div>
                </div>
                <input type="hidden" name="id" value={photoId}/>
                <div className="editphoto-button text-center m-5">
                    <input className="btn btn-primary btn-outline-danger" type="submit" value="delete"></input>
                </div>
                </form>
            </Default>
        );
    }

}

module.exports = DeletePhoto;

