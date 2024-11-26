/* eslint-disable react/prop-types */
import './style.css';

export default function LogbookTable({ logbookData, filteredLogs }) {
  if (!logbookData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div key={logbookData.id} className="logbook">
        <h2>{logbookData?.title}</h2>

        {filteredLogs.length > 0 ? (
          <table className="logbook-table">
            <thead>
              <tr>
                <th>Log Title</th>
                <th>Content</th>
                <th>Labels</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.title}</td>
                  <td>{log.content}</td>
                  <td className="label-column">
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
        ) : (
          <p>No logs found...</p>
        )}
      </div>
    </div>
  );
}
