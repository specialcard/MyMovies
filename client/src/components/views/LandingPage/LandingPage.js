import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_KEY, API_URL , IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';
import GridCard from '../commons/GridCard';
import {Row} from 'antd';

function LandingPage() {

    const [Movie,setMoive] = useState([]);
    const [MainMoiveImage, setMainMoiveImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        
        fetchMovie(endpoint);
    }, [])

    const fetchMovie = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setMoive([...Movie ,...res.results])
            setMainMoiveImage(res.results[0]);
            setCurrentPage(res.page)
        });
    }
    const onClick = () => {
        const endpoint= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovie(endpoint)
    }
    return (
        <div style={{width: '100%', margin: '0'}}>
            {/* main Imge */}
            {MainMoiveImage && 
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMoiveImage.backdrop_path}`}
                title={MainMoiveImage.original_title}
                text={MainMoiveImage.overview}
                color={'red'}
            />} 
            
            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>Movies By latest</h2>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movie && Movie.map((moive, index)=>(
                        <React.Fragment key={index}>
                            <GridCard
                                lendingPage
                                image={moive.poster_path ? `
                                    ${IMAGE_BASE_URL}w500${moive.poster_path}
                                ` : null}
                                moiveId={moive.id}
                                movieName={moive.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={onClick}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage;
