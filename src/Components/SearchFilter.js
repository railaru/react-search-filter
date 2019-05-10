import React, { Component } from 'react'        
import Fuse                 from 'fuse.js';
import axios                from 'axios'

import Card                 from './Card'


const  imageAddIncrement    = 12
let    images               = 4
let    page                 = 1


export class SearchFilter extends Component {

    constructor() {
        super()

        this.state = {
            isLoading: false,
            initialItems: [],
            SearchResult: []
        }
    }

    fetchImages() {
        
        this.setState({ isLoading: true })

        axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${images}`) 
        .catch((error) => console.log(error))
        .then((response) => {

            this.setState({ initialItems: response.data })
            this.setState({ isLoading: false })
            this.setState({ SearchResult: this.state.initialItems })
        })                    
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
              "author",
              "height",
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
                        SearchResult.map((item) => (                        
                            <Card
                                key={item.id}
                                title={item.author}
                                description={item.height}
                                img={item.download_url}
                                link={item.url}
                            />                                             
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default SearchFilter
