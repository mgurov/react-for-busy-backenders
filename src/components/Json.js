import React from 'react';


class Json extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false}
    }

    render() {
        if (this.state.open) {
            return <pre><code>{JSON.stringify(this.props.value, null, 2)}</code></pre>;
        } else {
            return <button className="btn primary">json</button>
        }
        
    }
}

export default Json;
