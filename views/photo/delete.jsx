var React = require("react");
var Default = require("../base/default");

class Delete extends React.Component {
    render() {
        let photoId = this.props.deletePhoto.id;
        let actionPath = `/photos/${photoId}/?_method=delete`; 
        return (
            <Default title="delete photo">
              <form method="POST" action={actionPath}>
              <h1>Are you sure you wanna delete the photo?</h1>
              <img src={this.props.deletePhoto.photo}/>
              <p>{this.props.deletePhoto.title}<br/>
                 {this.props.deletePhoto.taken_date}<br/>
                 {this.props.deletePhoto.location}<br/>
                 {this.props.deletePhoto.capture}<br/>
              </p>
              <input type="hidden" name="id" value={photoId}/>
               <input type="submit" value="delete"></input>
              </form>
            </Default>
        );
    }

}

module.exports = Delete;
