import './Json.css'
import React from 'react'

class JsonComponent extends React.Component {
    render() {
        return <pre className="Json">
            {JSON.stringify(this.props.value, null, 2)}
        </pre>
    }
}

export default JsonComponent;
  