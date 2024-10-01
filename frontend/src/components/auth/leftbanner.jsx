import React from 'react';
import './leftbanner.css';
import logo from '../../assets/davv.png';

const LeftBanner = () => {
    return (
        <div className='banner'>
            <p>IET DAVV<br></br>Placement Portal</p>
            <div className='image-container'>
                <img src={logo} alt='logo' />
            </div>
        </div>
    );
}

export default LeftBanner;
