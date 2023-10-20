import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../css/carrusel.css'


const ExampleCarouselImage = ({ text, img, className }) => {
    return (
        <div className="carrusel">
            <img className={`img-carrusel ${className} d-block w-100`}
                src={img}
                alt={text}
            />
        </div>
    )
}


const Carrusel = () => {
    return (
        <>
            <div className='linea'>

            </div>
            <Carousel className="carrusel">
                <Carousel.Item >
                    <ExampleCarouselImage img={'https://raisedbylatinos.com/wp-content/uploads/2022/09/top_5_latino_streetwear_brands_right_now.jpg'} className={'imagen1'} text="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <ExampleCarouselImage img={"https://d2r9epyceweg5n.cloudfront.net/stores/001/680/925/rte/MAD01272.jpg"} className={'imagen2'} text="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <ExampleCarouselImage img={"https://d2r9epyceweg5n.cloudfront.net/stores/001/680/925/rte/MAZ08465.jpg"} className={'imagen3'} text="Third slide" />
                </Carousel.Item>
            </Carousel>
            <div className='linea'>

            </div>
        </>
    )
}

export default Carrusel