import { examplesData } from '../lib/examplesData'
import { CodeBlock } from '../components/CodeBlock'
import { ExampleCard } from '../components/ExampleCard'
import './Examples.css'

export function Examples() {
  return (
    <div className="examples-page">
      <h1>Examples</h1>
      <p className="examples-intro">
        Interactive examples demonstrating ColorKit's capabilities.
        Try them out and see the code!
      </p>

      <div className="examples-grid">
        {examplesData.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </div>
    </div>
  )
}
