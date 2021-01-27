import React from 'react';
import {Button} from 'react-bootstrap'

class Json extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false}
    }

    render() {
        if (this.state.open) {
            return <pre><code>{JSON.stringify(this.props.value, null, 2)}</code></pre>;
        } else {
            return <>
            <Button size="sm">json</Button>
            </>
        }
        
    }
}

export default Json;
