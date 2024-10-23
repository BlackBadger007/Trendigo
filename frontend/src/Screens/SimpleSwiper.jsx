import React, { useState } from 'react';
import '../Swiper.css'
import { Link } from 'react-router-dom';
import { FaChevronRight , FaChevronLeft } from 'react-icons/fa';
// import './Swiper.css'; // Import your CSS file

const SimpleSwiper = ({moreProduct}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    // const slides = Array.from({ length: 12 }, (_, i) => `Slide ${i + 1}`); // Create an array of slides
    const slides = moreProduct ; // Create an array of slides

    const moveSlide = (direction) => {
        setCurrentIndex(prevIndex => {
            const totalSlides = slides.length;
            let newIndex = prevIndex + direction;

            // Wrap around if out of bounds
            if (newIndex < 0) {
                return totalSlides - 1;
            } else if (newIndex >= totalSlides) {
                return 0;
            }
            return newIndex;
        });
    };

    const offset = -currentIndex * 340; // Update according to your slide width

    return (
        <div className="swiper-container">
            <div className="swiper-wrapper" style={{ transform: `translateX(${offset}px)` }}>
                {/* {slides.map((slide, index) => (
                    <div className="swiper-slide" key={index}>
                        {slide}
                    </div>
                ))} */}
                {slides.map((x) => (
                    <div className="swiper-slide" key={x._id} >
                        <Link to={`/product/${x._id}`} key={x._id} className="swip-category" >
                        <div className="more-card" >
                            <img src={x.image} alt="" />
                            <div className="grid-info">
                            <h2>{x.brand} {x.title} {x.description}</h2>
                            <h3 style={{ color:"orange"}} >-{(((Number(x.mrp) - Number(x.price))*100)/Number(x.mrp)).toFixed(0)}% ${x.price}</h3>
                            <h3 style={{textDecoration:'line-through'}} >M.R.P. ${x.mrp}</h3>
                            <h3>InStock : {x.inStock}</h3>
                            </div> 
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
                {/* <div className="swi-btn"> */}

            <button className="prev" onClick={() => moveSlide(-1)}><FaChevronLeft/></button>
            <button className="next" onClick={() => moveSlide(1)}><FaChevronRight/></button>
                {/* </div> */}
        </div>
    );
};

export default SimpleSwiper;
