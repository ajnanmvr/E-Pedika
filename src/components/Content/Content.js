import React, { useEffect, useState } from 'react';
import Axios from '../../Axios';
import Card from './Card';
import SideBar from './SideBar';

function Content() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch data from the API using axios
    Axios.get('/data')
      .then(response => {
        setCards(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error(error.response);
      });
  }, []);

  return (
    <div className="content">
      <SideBar />
      <div className="content-main">
        <div className="card-grid">
          {cards.length > 0 ? (
            cards.map((card,key) => (
              <Card key={key} card={card} />
            ))
          ) : (
            <p>Loading data..</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Content;
