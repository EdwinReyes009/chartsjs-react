import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts';

function App() {
  const [data, setData] = useState([]);

  const updateData = (newData) => {
    setData(newData);
  };

  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:4001/');

    socket.on('message', updateData);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <LineChart
      width={1200}
      height={600}
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
      <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
      <Line type="monotone" dataKey="z" stroke="#0000ff" yAxisId={2} />
    </LineChart>
  </div>
);
  };
export default App;
