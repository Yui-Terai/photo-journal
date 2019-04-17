var React = require("react");
var Default = require("../base/default");

class Newphoto extends React.Component {
    render() {
        return (
            <Default title="add photo">
                <div className="container">
                    <h1>add your photo</h1>
                    <form action="/photos" method="post" enctype="multipart/form-data">
                    photo: <input type="file" name="photo"/>
                    <br/>
                    title: <input type="text" name="title"/>
                    <br/>
                    location: <input type="text" name="location"/>
                    <br/>
                    date: <input type="text" name="taken_date"/>
                    <br/>
                    capture: <input type="text" name="capture"/>
                    <br/>
                    <input type="submit" value="add"></input>
                    </form>
                </div>
            </Default>
        );
    }

}

module.exports = Newphoto;



