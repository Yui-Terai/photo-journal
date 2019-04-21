var React = require("react");
var Default = require("../base/default");

class Newphoto extends React.Component {
    render() {
        return (
            <Default title="add photo">
                <h1 className="newphoto-h1">add a new photo</h1>
                <form action="/photos" method="post" enctype="multipart/form-data">
                <div className="newphoto-form">
                    <table>
                    <tr>
                        <td>photo:</td> 
                        <td><input className="newphoto-input" type="file" name="photo"/></td>
                    </tr>
                    <tr>
                        <td>title:</td>
                        <td><input className="newphoto-input" type="text" name="title"/></td>
                    </tr>
                    <tr>
                        <td>location:</td>
                        <td><input className="newphoto-input" type="text" name="location"/></td>
                    </tr>
                    <tr>
                        <td>date:</td>
                        <td><input className="newphoto-input" type="text" name="taken_date"/></td>
                    </tr>
                    <tr>
                        <td>capture:</td>
                        <td><input className="newphoto-input" type="text" name="capture"/></td>
                    </tr>
                    </table>
                </div>
                <div className="newphoto-submit-div">
                  <input className="btn btn-primary btn-outline-dark" type="submit" value="add"></input>
                </div>
                </form>
            </Default>
        );
    }   

}

module.exports = Newphoto;


