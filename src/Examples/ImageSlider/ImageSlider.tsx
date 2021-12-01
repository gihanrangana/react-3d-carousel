import React from 'react'
import Carousel from 'src/Component/Carousel/Carousel'

import styles from './ImageSlider.module.scss'

const ImageSlider: React.FC<ImageSliderProps> = (props) => {

    const slides = [];

    for(let i = 0; i < 10; i++) {
        slides.push({
            url: 'https://picsum.photos/500/300?random=' + i,
            alt: "image " + i
        })
    }
    
    return (
        <>
            <Carousel
                slides={slides} // slides to display
                classes={{ // custom classes should goes here
                    container: styles.sliderWrapper,
                }}
                type={"images"} // type of slider. this renders slider as image slider
            />
        </>
    )
}

interface ImageSliderProps {
    [key: string]: any;
}

export default ImageSlider