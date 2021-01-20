import './Json.css'
import React from 'react'
import {Button} from 'react-bootstrap'

class JsonComponent extends React.Component {

    constructor(props) {
        super(props);
        const {open} = props
        this.state = {
            open: open
        };

        this.toggleOpen = () => {
            this.setState({open: !this.state.open})
        }
    }

    render() {
        if (this.state.open) {
            return <pre className="Json" onClick={this.toggleOpen}>
                {JSON.stringify(this.props.value, null, 2)}
            </pre>
        } else {
            return <Button variant="link" size="sm" onClick={this.toggleOpen}>json</Button>
        }
        
    }
}

export default JsonComponent;
  