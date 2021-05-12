import React,{useEffect, useState} from 'react'
import {API_URL,API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../commons/GridCard';
import {Row} from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle , setActorToggle] = useState(false)

  let movieId = props.match.params.movieId
  let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
  let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  useEffect(()=>{
    console.log(props.match)
    fetch(endpointInfo)
    .then(res => res.json())
    .then(res => {
      setMovie(res)
    })
    fetch(endpointCrew)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setCasts(res.cast)
    })
  },[])

  const onToggle = () => {
    setActorToggle(!ActorToggle);
  }

  return (
    <div>
    {/*header*/}
    {Movie && <MainImage 
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
    />}
    {/*body*/}
      <div style={{ width: '85%', margin: '1rem auto'}}>
      <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        
      {/* Movie info */}
      <MovieInfo movie={Movie}/>
      <br />
      {/* Actors grid */}
        <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
          <button onClick={onToggle}>Toggle Actor View</button>

        </div>
        {ActorToggle && 
          <Row gutter={[16, 16]}>
            {Casts && Casts.map((cast, index)=>(
              <React.Fragment key={index}>
                  <GridCard 
                    image={cast.profile_path ? `
                    ${IMAGE_BASE_URL}w500${cast.profile_path}
                    ` : null}
                    characterName={cast.image}
                    />
              </React.Fragment>
            ))}
          </Row>
        }
      </div>
    </div>
  )
}

export default React.memo(MovieDetail);
