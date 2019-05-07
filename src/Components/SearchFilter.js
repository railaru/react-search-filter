import React, { Component } from 'react'
import Fuse from 'fuse.js';
import Card from './Card'


export class SearchFilter extends Component {

    constructor() {
        super()

        this.state = {
            initialItems: [
                {
                    id: 0,
                    title: "Define® polished chrome ingot switched sockets with twin USB outlets: FPCH580BK",    
                    description: "Scolmore International Limited",    
                    img: 'https://source.unsplash.com/random/400x300',
                    link: 'https://www.google.com',                    
                },             
                {
                    id: 1,
                    title: "Reynaers Hi-Finity Sliding Door",    
                    description: "HNS Aluminium",    
                    img: 'https://source.unsplash.com/random/400x301',
                    link: 'https://www.google.com',
                },             
                {
                    id: 2,
                    title: "Chestnut Strand woven parquet block bamboo flooring: F1072",    
                    description: "The Bamboo Flooring Company",    
                    img: 'https://source.unsplash.com/random/400x302',
                    link: 'https://www.google.com',
                },             
                {
                    id: 3,
                    title: "006 Black Edition Ashdown : 520",    
                    description: "HNS Aluminium",    
                    img: 'https://source.unsplash.com/random/400x303',
                    link: 'https://www.google.com',
                },             
                {
                    id: 4,
                    title: "Abbeydale Red Multi Brick",    
                    description: "Wienerberger",    
                    img: 'https://source.unsplash.com/random/400x304',
                    link: 'https://www.google.com',
                },             
            ],
            SearchResult: []
        }
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
              "title",
              "description",
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
        this.setState({ SearchResult: this.state.initialItems })
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
                           <div key={item.id}>
                               <Card
                                    key={item.id}
                                    title={item.title}
                                    description={item.description}
                                    img={item.img}
                                    link={item.link}
                               />                     
                           </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default SearchFilter
