import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjc2Mzg0MTM1NmU3NTM0MzhiNTkwZmU3YTAzZWZmMCIsIm5iZiI6MTc1MTcyMDQ0Mi40NTI5OTk4LCJzdWIiOiI2ODY5MjFmYTRjYzc3ZjY4YzBlZDUwZWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.isCazwf1DJBAoe1R8zfm_GK2No9yxHcIfpQ2BEeoSMs'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  });

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back Arrow" onClick={() => navigate(-1)} />
      <iframe width={"90%"} height={"90%"} src={`https://www.youtube.com/embed/${apiData.key}`} title='Trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
