var React = require("react");
var Default = require("../base/default");

class EditPhoto extends React.Component {
    render() {
        let photoId = this.props.editPhoto.id;
        let actionPath = `/photos/${photoId}/?_method=PUT`; 
        return (
            <Default title="edit photo">
                <h1 className="editphoto-title text-center m-5">edit photo</h1>
                <form method="POST" action={actionPath}>
                <div className="d-flex flex-row justify-content-center">
                    <div className="editphoto-img mr-1"> 
                        <img src={this.props.editPhoto.photo}/>
                    </div>
                    <div className="editphoto-form ml-1">
                        <div className="form-group">
                          <label className="p-0" for="editphoto-title">title:</label>
                          <input type="text" className="editphoto-input form-control" id="editphoto-title" name="title" value={this.props.editPhoto.title}/>
                        </div>
                        
                        <div className="form-group">
                          <label className="p-0" for="editphoto-location">location:</label>
                          <input type="text" className="editphoto-input form-control" id="editphoto-location" name="location"  value={this.props.editPhoto.location}/>
                        </div>
                        <div className="form-group">
                          <label className="p-0" for="editphoto-takendate">date:</label>
                          <input type="text" className="editphoto-input form-control" id="editphoto-takendate" name="taken_date" value={this.props.editPhoto.taken_date}/>
                        </div>
                        <div className="form-group">
                          <label className="p-0" for="editphoto-capture">capture:</label>
                          <textarea className="editphoto-input form-control" id="editphoto-capture" rows="5" name="capture" value={this.props.editPhoto.capture}></textarea>
                        </div>
                    </div>
                </div>
                <div className="editphoto-button text-center m-5">
                  <input className="btn btn-primary btn-outline-dark" type="submit" value="done"></input>
                </div>
                </form>
            </Default>
        );
    }
}

module.exports = EditPhoto;

