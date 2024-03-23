import axios from 'axios'
import {React, useState, useEffect } from 'react'
const apiKey = "live_ZA9XdRWHujDNlPBVfPtGwg0z67R6ueQ2auusHvMZo0GkDNNYojE0veZYEtM7SbJA"

function Infobox(){
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])  
    const url = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}&has_breeds=1`
    const handleFilterButton = (e) => {
        if (!filter.includes(e.target.innerText)){
            setFilter([...filter, e.target.innerText])
        }
    }
    const fetchData = () => {
        if(filter.length != 0 && data.length != 0){
            data[0]['attr'].forEach((e) => {
                if (filter.includes(e)){
                    fetchData()
                }
            })
            console.log()
        }
        axios.get(url).then((response) => {
            let apiData = response.data[0]
            setData([{
                name : apiData['breeds'][0]['name'],
                attr : [
                    {origin: apiData['breeds'][0]['origin'],
                    lifeSpan: `LS: ${apiData['breeds'][0]['life_span']}`,
                    weight: `Weight: ${apiData['breeds'][0]['weight']['metric']}`}
                ],
                pic : apiData['url'],
            }])
        })
    }

    return(
    <>
        <div className='info-display'>
            <h1>Cats Cats Cats</h1>
            <h2>All the cats you can see</h2>
            {data == 0 ? <p>---</p> : data.map((key,i) => {
                return(
                    <div key={i}>
                        <h3>{key.name}</h3>
                        <div className="attributes">
                            <button onClick={handleFilterButton}>{key.attr[0]['origin']}</button>
                            <button onClick={handleFilterButton}>{key.attr[0]['lifeSpan']}</button>
                            <button onClick={handleFilterButton}>{key.attr[0]['weight']}</button>
                        </div>
                        <img src={key.pic} alt="cat-pic" />
                    </div>
                )})
                }
            
            <button onClick={fetchData}>Discover!</button>  
        </div>
        <div className='ban-list'>
            <div>
                <h2>Filter List</h2>
                {filter == 0 ? <p></p> : filter.map((f, j) => {
                    return (
                        <div className="attributes" key={j}>
                        <button>{f}</button>
                    </div>   
                    )             
                })}
            </div>
            
        </div>
    </>
    )
}


export default Infobox