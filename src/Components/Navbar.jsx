import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">PicSeek</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>Link</a></li>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'generate'}>Generate Image</Link></li>
            
          </ul>
        </div>
      </div>
    );
};

export default Navbar;