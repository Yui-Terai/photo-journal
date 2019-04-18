var React = require("react");
var Default = require("../base/default");

class Journal extends React.Component {
    render() {
        return (
            <Default title="journal">
              <img src={this.props.journal.photo}/>
              <p>{this.props.journal.title}<br/>
                 {this.props.journal.taken_date}<br/>
                 {this.props.journal.location}<br/>
                 {this.props.journal.capture}<br/>
              </p>
            </Default>
        );
    }

}

module.exports = Journal;
