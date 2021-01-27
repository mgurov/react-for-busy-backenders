import React from 'react';
import {Button} from 'react-bootstrap'

class Json extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false}
        this.toggleState = () => {
            this.setState({open: !this.state.open})
        }
    }

    render() {
        if (this.state.open) {
            return <pre onClick={this.toggleState}><code>{JSON.stringify(this.props.value, null, 2)}</code></pre>;
        } else {
            return <>
            <Button size="sm" variant="light" onClick={this.toggleState}>json</Button>
            </>
        }
        
    }
}

export default Json;
