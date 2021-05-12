import React,{ useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [FavoriteNumber,setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false)

  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRuntime: movieRuntime,
  }

  const getUser = window.localStorage.getItem('userId');


  useEffect(()=>{
    axios.post('/api/favorite/FaoveriteNumber',variables)
    .then(res => {
      console.log(res.data);
      setFavoriteNumber(res.data.favoriteNumber)
      if(res.data.success){
        console.log(FavoriteNumber)
      }else{
        alert('숫자 정보를 가져오는데 실패 하였습니다');
      }
    })

    axios.post('/api/favorite/favorited',variables)
    .then(res => {
      console.log(res.data);
      if(res.data.success){
        console.log('favor', res.data)
        setFavorited(res.data.favorited)
      }else{
        alert('숫자 정보를 가져오는데 실패 하였습니다');
      }
    })
  },[])

  const onClickFavorite = () => {

    if(getUser){
      if(Favorited){
        axios.post('/api/favorite/removeFromfavorite', variables)
        .then( res => {
          if(res.data.success){
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited)
          }else{
            alert('Favorite 리스트에서 지우는것에 실패하셨습니다.')
          }
        })
      }else{
        axios.post('/api/favorite/addFromFavorite', variables)
        .then( res => {
          if(res.data.success){
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          }else{
            alert('Favorite 리스트에서 추가하는것에 실패하셨습니다.')
          }
        })
      }
    }else{
      alert('로그인을 해주세요')
      props.history.push('/login')
    }
  }

  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "ADD TO Favorite"} {FavoriteNumber}</button>
    </div>
  )
}

export default withRouter(Favorite);