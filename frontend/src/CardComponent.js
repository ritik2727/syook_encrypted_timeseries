import React from 'react';
import "./App.css";
function CardComponent({ data }) {
  return (
    <div>
    <h2>Data Display</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Timestamp</th>
          <th>Name</th>
          <th>Origin</th>
          <th>Destination</th>
        </tr>
      </thead>
      <tbody>
        {data && data.upsertRes.data.map((item,idx) => (
          <tr key={idx}>
            <td>{item._id}</td>
            <td>{item.timestamp}</td>
            <td>{item.name}</td>
            <td>{item.origin}</td>
            <td>{item.destination}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default CardComponent;