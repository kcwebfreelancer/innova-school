import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component'
import BodyHeader from '../components/BodyHeader';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);
    const [loading, setLoading] = useState(true);
    const fetchProducts = async () => {
        try {
            let response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset10&limit=12`);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchMoreProducts = async () => {
        try {
            let response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${index}&limit=12`);
            setProducts((prevProducts) => [...prevProducts, response.data]);
            setLoading(false);
            setIndex((prevIndex) => prevIndex + 10);
            response.data.length > 0 ? setHasMore(true) : setHasMore(false);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className='container'>
            <div className='content-body'>
                <BodyHeader title="Products" />
                <div className='content-body-container'>
                    <InfiniteScroll
                        dataLength={products.length}
                        next={fetchMoreProducts}
                        hasMore={hasMore}
                        loader="Loading...."
                    >

                        <ul>
                            {
                                products.length > 0 ? products.map((product, index) => <li key={index}>{product.title? product.title : ''}</li>)
                                    : <p>No results found.</p>
                            }
                        </ul>

                    </InfiniteScroll>

                </div>
            </div>
        </div>
    )
}

export default Products