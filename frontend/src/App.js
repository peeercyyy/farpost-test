import React from 'react';
import axios from 'axios';
import Bulletin from './Components/Bulletin/Bulletin';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get('/bulletin_data').then((data) => setData(data.data));
  }, []);

  return (
    <div className='App'>
      {!data ? (
        <p>'Loading...'</p>
      ) : (
        data.map((item) => (
          <Bulletin
            bulletin={item}
            key={item.id}
          />
        ))
      )}
    </div>
  );
}

export default App;
