import { apiData } from '../lib/apiData'
import { CodeBlock } from '../components/CodeBlock'
import './Api.css'

export function Api() {
  return (
    <div className="api-page">
      <h1>API Reference</h1>
      <p className="api-intro">
        Complete API documentation for ColorKit. Click on any category to expand.
      </p>

      {apiData.map((category) => (
        <div key={category.name} className="api-category">
          <h2 id={category.id}>{category.name}</h2>
          <p className="category-description">{category.description}</p>

          {category.items.map((item) => (
            <div key={item.name} className="api-item">
              <h3 className="api-name">
                <code>{item.signature}</code>
              </h3>
              <p className="api-description">{item.description}</p>

              {item.params && (
                <div className="api-params">
                  <h4>Parameters</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.params.map((param) => (
                        <tr key={param.name}>
                          <td><code>{param.name}</code></td>
                          <td><code>{param.type}</code></td>
                          <td>{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {item.returns && (
                <div className="api-returns">
                  <h4>Returns</h4>
                  <p><code>{item.returns.type}</code> - {item.returns.description}</p>
                </div>
              )}

              {item.example && (
                <div className="api-example">
                  <h4>Example</h4>
                  <CodeBlock code={item.example} language="typescript" />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
