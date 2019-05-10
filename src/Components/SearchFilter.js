import React, { Component } from 'react'        
import Fuse                 from 'fuse.js';
import axios                from 'axios'

import Card                 from './Card'
import LoadingDots          from './LoadingDots'

const  imageAddIncrement    = 6
let    images               = 12
let    page                 = 1


export default class SearchFilter extends Component {

    constructor() {
        super()

        this.state = {
            isLoading: false,
            initialItems: [],
            SearchResult: []
        }
    }

    onImagesLoadedToDOM(container, event) {
        var images = container.querySelectorAll(".card__img");
        var loaded = images.length;
        for (var i = 0; i < images.length; i++) {
            if (images[i].complete) {
            loaded--;
            } else {
            // eslint-disable-next-line
            images[i].onload = () => {
                loaded--;
                if (loaded === 0) {
                event();
                }
            };
            }
            if (loaded === 0) {
            event();
            }
        }
    }

    fetchImages() {
        
        this.setState({ isLoading: true })
        
        axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${images}`) 
        .catch((error) => console.log(error))
        .then((response) => {
                            
            this.setState({ initialItems: response.data })
    
            this.setState({ SearchResult: this.state.initialItems })
            
            this.onImagesLoadedToDOM(document.querySelector(".gallery-search-results"), () => {

                this.setState({ isLoading: false })                                            
            })        
    
        })                    
    }

    isBottom() {
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
               
               page ++
               images = images + imageAddIncrement
               this.fetchImages()
            }
         });
    }

    filterList = (e) => {

        const options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "name",
              "tagline",
            ]
          };
          
          const input  = e.target.value
          const fuse   = new Fuse(this.state.initialItems, options); 
          const result = fuse.search(input);

          if(input === ''){
            this.setState({ SearchResult: this.state.initialItems })
          }else{
            this.setState({ SearchResult: result })          
          }          
    }

    componentDidMount() {

        this.fetchImages()       
        this.isBottom() 
    }

    render() {

        const { SearchResult } = this.state

        return (
            <div>
                <input
                    type='search'
                    className='gallery-search-input'
                    placeholder='Start typing to search for products and materials'
                    onChange={this.filterList}
                />
                <div className='gallery-search-input__bottom-border' />

                <div className='gallery-search-results'>
                    {
                        SearchResult.map(({ id, name, tagline, image_url }) => (                        
                            <Card
                                key={id}
                                link={image_url}
                                img={image_url}
                                title={name}                                
                                description={tagline}                                
                            />                                             
                        ))
                    }
                </div>
                {
                    this.state.isLoading &&
                        <LoadingDots/>
                }
            </div>
        )
    }
}


