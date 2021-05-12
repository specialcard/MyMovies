import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import './favorite.css';
import { Popover } from 'antd'
import {IMAGE_BASE_URL} from '../../Config';
function Favorite() {

  const [Favorites, setFavorites] = useState([]);
  

  useEffect(()=>{
    fetchFavoritedMovie();
  },[]);

  const fetchFavoritedMovie = () => {
    Axios.post('/api/favorite/getFavoritedMovie',{
      userFrom: localStorage.getItem('userId')
    })
    .then(res => {
      if(res.data.success){
        setFavorites(res.data.favorites)
      }else{
        alert('영화정보를 가져오는데 실패하였습니다.')
      }
    });
  }

  const onClickDelete = (movieId, userForm) => {
    const variables = {
      movieId,
      userForm
    }
    Axios.post('/api/favorite/removeFromFavoriteOne', variables)
    .then( res => {
      if(res.data.success){
        fetchFavoritedMovie();
      }else{
        alert("리스트에서 지우는데 실패했습니다")
      }
    })
  }

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? <img  src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : 'no img'}
      </div>
    )
    return <tr key={index}>
      <Popover content={content} title={`${favorite.movieTitle}`}>
        <td>{favorite.movieTitle}</td>
      </Popover>
      <td>{favorite.movieRuntime}</td>
      <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Removie</button></td>
    </tr>
  })


  return (
    <div style={{ width: '85%', margin: '3rem auto'}}>
      <h2>Favorite Moives</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie title</th>
            <th>Movie runtime</th>
            <th>Movie from favorite</th>
          </tr>
        </thead>
        <tbody>
           {renderCards}
        </tbody>
      </table>
    </div>
  )
}

export default Favorite;
