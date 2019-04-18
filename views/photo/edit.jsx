var React = require("react");
var Default = require("../base/default");

class Edit extends React.Component {
    render() {
        let photoId = this.props.editPhoto.id;
        let actionPath = `/photos/${photoId}/?_method=PUT`; 
        return (
            <Default title="edit photo">
            <h1>TEST</h1>
              <img src={this.props.editPhoto.photo}/>
              <form method="POST" action={actionPath}>
              title: <input name="title" type="text" value={this.props.editPhoto.title}/><br/>
              location: <input name="location" type="text" value={this.props.editPhoto.location}/><br/>
              date: <input name="taken_date" type="text" value={this.props.editPhoto.taken_date}/><br/>
              capture: <input name="capture" type="text" value={this.props.editPhoto.capture}/><br/>
              <input type="submit" value="done"></input>
              </form>
            </Default>
        );
    }
}

module.exports = Edit;