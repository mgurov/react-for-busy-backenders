import React from 'react';


class Json extends React.Component {
    render() {
        return <pre><code>{JSON.stringify(this.props.value, null, 2)}</code></pre>;
    }
}

export default Json;
