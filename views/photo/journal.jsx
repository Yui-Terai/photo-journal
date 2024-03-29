var React = require("react");
var Default = require("../base/default");

class Journal extends React.Component {
    render() {
        return (
            <Default title="journal">
            <div className="journal-title m-5"><h1>my journal</h1></div>
                <div className="journal-container container">
                  <div className="row">
                    <div className="journal-photo col">
                      <img src={this.props.journal.photo}/>
                    </div>
                    <div className="story-holder col">
                        <div className="title">
                          <h1 className="journal-h1">{this.props.journal.title}</h1>
                        </div>
                        <div className="intro">
                          <p>{this.props.journal.taken_date} </p>
                          <p>{this.props.journal.location}</p>
                        </div>
                        <div className="article">
                          <p>{this.props.journal.capture}</p>
                        </div>
                    </div>
                  </div>
                  <div className="editphoto-button text-right m-3">
                  <a href={`/photos/${this.props.journal.id}/edit`} className="btn btn-primary btn-sm active btn btn-outline-secondary edit-delete-button mr-1 mt-2" role="button" aria-pressed="true">edit</a>
                    <a href={`/photos/${this.props.journal.id}/delete`} className="btn btn-primary btn-sm active btn btn-secondary edit-delete-button ml-1 mt-2" role="button" aria-pressed="true">delete</a>
                </div>
                </div>
            </Default>
        );
    }

}

module.exports = Journal;











{/* <img src={this.props.journal.photo}/>
              <p>{this.props.journal.title}<br/>
                 {this.props.journal.taken_date}<br/>
                 {this.props.journal.location}<br/>
                 {this.props.journal.capture}<br/>
              </p> */}