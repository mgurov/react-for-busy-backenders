import './Json.css'

export default function Json({value}) {
    return <pre className="Json">{JSON.stringify(value, null, 2)}</pre>
}
  