import React from 'react';
import Carousel from '../components/Carousel/Carousel';
import ServiceCards from '../components/ServiceCards/ServiceCards';
import Partners from '../components/Partners/Partners';
import PlatformStats from '../components/PlatformStats/PlatformStats';

const Home = () => {
    return (
        <div className='mx-auto'>
            <Carousel/>
            <ServiceCards/>
            <Partners/>
            <PlatformStats/>
        </div>
    );
};

export default Home;