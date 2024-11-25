/* eslint-disable react/prop-types */
import './style.css';

export default function LogbookTable({ data }) {
  return (
    <div>
      {data.map((logbook) => (
        <div key={logbook.id} className="logbook">
          <h2>{logbook.title}</h2>

          <table className="logbook-table">
            <thead>
              <tr>
                <th>Log Title</th>
                <th>Content</th>
                <th>Labels</th>
              </tr>
            </thead>

            <tbody>
              {logbook.logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.title}</td>
                  <td>{log.content}</td>
                  <td>
                    {log.label.map((label, index) => (
                      <span key={index} className={`label-pill ${label.toLowerCase()}`}>
                        {label}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
