import { useEffect, useRef, useState } from 'react'
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjc2Mzg0MTM1NmU3NTM0MzhiNTkwZmU3YTAzZWZmMCIsIm5iZiI6MTc1MTcyMDQ0Mi40NTI5OTk4LCJzdWIiOiI2ODY5MjFmYTRjYzc3ZjY4YzBlZDUwZWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.isCazwf1DJBAoe1R8zfm_GK2No9yxHcIfpQ2BEeoSMs'
    }
  };

  

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
