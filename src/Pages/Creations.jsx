import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTtile';
import { Link } from 'react-router';

const Creations = () => {

    const [images, setImages] = useState([]);
 
    useEffect(()=>{
        fetch('https://pic-seek-server-theta.vercel.app/api/v1/image/all')
        .then(res=>res.json())
        .then(data=> setImages(data))
        
    }, []);
    
   
    return (
        <div>
            <PageTitle>All Creations</PageTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto'>
                {
                    images.map(img=> (<div key={img._id}>
                        <div className="card bg-base-100 relative  shadow-sm">
  <figure  >
    <img  className='w-full'
      src={img.thumb_img}
      alt="Shoes" />
  </figure>
  <div className="card-body absolute bottom-0.5 left-0.5">
  <Link to={`/creation/${img._id}`} className='btn btn-accent'>Details</Link>

   
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