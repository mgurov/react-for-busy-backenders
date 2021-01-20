export default function Json({value}) {
    return <pre>{JSON.stringify(value, null, 2)}</pre>
}
  