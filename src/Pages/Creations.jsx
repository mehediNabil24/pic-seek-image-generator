import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTtile';
import { Link } from 'react-router';

const Creations = () => {
    const [images, setImages] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/image/all')
        .then(res=>res.json())
        .then(data=> setImages(data))
        
    }, []);
    
   
    return (
        <div>
            <PageTitle>All Creations</PageTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    images.map(img=> (<div key={img._id}>
                        <div className="card bg-base-100 relative  shadow-sm">
  <figure>
    <img className='w-full'
      src={img.thumb_img}
      alt="Shoes" />
  </figure>
  <div className="card-body absolute bottom-0.5 left-0.5">
    <Link to={`creation/${img._id}`} className='btn btn-secondary'>Details</Link>
   
  </div>
</div>

                    </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Creations;