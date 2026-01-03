import { useState } from 'react'
import { CodeBlock } from './CodeBlock'
import './ExampleCard.css'

interface ExampleCardProps {
  example: {
    id: string
    title: string
    description: string
    code: string
    result: React.ReactNode
  }
}

export function ExampleCard({ example }: ExampleCardProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="example-card">
      <div className="example-header">
        <h3>{example.title}</h3>
        <button
          className="toggle-code"
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      <p className="example-description">{example.description}</p>

      <div className="example-result">
        {example.result}
      </div>

      {showCode && (
        <div className="example-code">
          <CodeBlock code={example.code} language="typescript" />
        </div>
      )}
    </div>
  )
}
