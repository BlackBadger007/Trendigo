import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './index.css'; // Make sure your CSS file is imported

const Swiper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const slides = [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJlbmR8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJlbmR8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJlbmR8ZW58MHx8MHx8fDA%3D",
        
    ];

    const updateSlides = () => {
        const offset = -currentIndex * 33.4; // Assuming full width slides
        document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
        updatePagination();
    };

    const updatePagination = () => {
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = ''; // Clear existing pagination
        slides.forEach((_, index) => {
            const span = document.createElement('span');
            span.classList.toggle('active', index === currentIndex);
            span.addEventListener('click', () => {
                setCurrentIndex(index);
            });
            pagination.appendChild(span);
        });
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 2000); // Change slide every 2 seconds
        updateSlides();
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <div className="swiper-container">
            <div className="slides">
                {/* {slides.map((src, index) => (
                    <div className="slide" key={index}>
                        <img src={src} alt={`Slide ${index + 1}`} />
                    </div>
                ))} */}

<div className="slide">
                <Link to={`/search/gadgets`} className="swip-category" >
                <div className="swip-card">
                    <img src="https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D" alt="" />
                    <h1>20% off on gadgets</h1>
                    {/* slide1 */}
                </div>
                </Link>
            </div>
            <div className="slide">
                <Link to={`/search/appliances`} className="swip-category">
                <div className="swip-card">
                    <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D" alt="" />
                    <h1>10% off on appliances</h1>
                    {/* slide2 */}
                </div>
                </Link>
            </div>
            <div className="slide">
                <Link to={`/search/clothes`} className="swip-category">
                <div className="swip-card">
                    <img src="https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJlbmR8ZW58MHx8MHx8fDA%3D" alt="" />
                    <h1>70% off on clothes</h1>
                    {/* slide3 */}
                </div>
                </Link>
            </div>
            <div className="slide">
                <Link to={`/search/tvs`} className="swip-category">
                <div className="swip-card">
                    <img src="https://plus.unsplash.com/premium_photo-1681236323432-3df82be0c1b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHZ8ZW58MHx8MHx8fDA%3D" alt="" />
                    <h1>60% off on tvs</h1>
                    {/* slide4 */}
                </div>
                </Link>
            </div>
            <div className="slide">
                <Link to={`/search/cosmetics`} className="swip-category">
                <div className="swip-card">
                    <img src="https://images.unsplash.com/photo-1577058109956-67adf6edc586?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29zbWV0aWNzfGVufDB8fDB8fHww" alt="" />
                    <h1>35% off on cosmetics</h1>
                    {/* slide5 */}
                </div>
                </Link>
            </div>
            <div className="slide">
                <Link to={`/search/tws`} className="swip-category">
                <div className="swip-card">
                    <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D" alt="" />
                    <h1>35% off on tws</h1>
                    {/* slide6 */}
                </div>
                </Link>
            </div>
            <div className="slide">
                <Link  to={`/search/shoes`} className="swip-category" >
                <div className="swip-card">
                <img src="https://plus.unsplash.com/premium_photo-1664202526744-516d0dd22932?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBjb2xsZWN0aW9ufGVufDB8fDB8fHww" alt="" />
                    <h1>40% off on shoes</h1>
                
                </div>
                </Link>
            </div>
            <div className="slide">
            <Link  to={`/search/homedecors`} className="swip-category" >
                <div className="swip-card">
                <img src="https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8fDA%3D" alt="" />
                <h1>45% off on homedecors</h1>
                    {/* slide8 */}
                </div>
            </Link>
            </div>
            <div className="slide">
            <Link  to={`/search/watches`} className="swip-category" >
                <div className="swip-card">
                <img src="https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdhdGNoZXN8ZW58MHx8MHx8fDA%3D" alt="" />
                <h1>30% off on premium watches</h1>
                    {/* slide9 */}
                </div>
            </Link>
            </div>


            </div>
            <div className="pagination"></div>
        </div>
    );
};

export default Swiper;
