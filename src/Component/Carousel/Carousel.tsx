import React, { useCallback, useEffect } from 'react';
import { useSwipe } from '../../useSwipe/useSwipe';
import { FiArrowRightCircle, FiArrowLeftCircle } from 'react-icons/fi';

import styles from './Carousel.module.scss'

const Carousel: React.FC<CarouselProps> = (props) => {

    let { slides, renderContent, classes, buttons, type }: any = props;

    if (!type) type = 'image';

    const [activeSlide, setActiveSlide] = React.useState(8);

    const slideRef: any = React.useRef();

    const { swipeDirection, setRef } = useSwipe({ ref: slideRef });

    useEffect(() => {

        setRef(slideRef.current);

    }, [slideRef]);

    const isActive = (index: number, activeIndex: number) => index === activeIndex;

    const isPrev = (index: number, activeIndex: number) => {

        if (activeIndex === 0) return index === slides.length - 1;
        else return index === activeIndex - 1;

    }

    const isNext = (index: number, activeIndex: number) => {

        if (activeIndex === slides.length - 1) return index === 0;
        else return index === activeIndex + 1;

    };

    const handleNext = useCallback(() => {

        let nextSlide = activeSlide + 1;
        if (nextSlide === slides.length) nextSlide = 0;

        setActiveSlide(nextSlide);

    }, [activeSlide]);

    const handlePrev = useCallback(() => {

        let prevSlide = activeSlide - 1;

        if (prevSlide < 0) {
            prevSlide = slides.length - 1;
        }

        setActiveSlide(prevSlide);

    }, [activeSlide]);

    useEffect(() => {

        if (!swipeDirection) return;

        const direction = swipeDirection.split('.')[0];

        if (direction === 'left') handleNext();

        if (direction === 'right') handlePrev();

    }, [swipeDirection])

    useEffect(() => {
        if (!props.auto || !props.speed) return;

        setInterval(() => handleNext(), props.speed);

    }, [props.auto])

    return (
        <div className={[styles.wrapper, classes?.wrapper].join(' ')}>

            <div className={[styles.sliderContainer, classes?.container].join(' ')}>

                <div ref={slideRef} className={styles.overlay} />

                {slides && slides.map((slide: any, index: number) => {

                    let classNames = [styles.slide, classes?.slide];

                    if (isActive(index, activeSlide)) classNames.push(styles.active);
                    if (isPrev(index, activeSlide)) classNames.push(styles.prev);
                    if (isNext(index, activeSlide)) classNames.push(styles.next);

                    return (

                        <div
                            key={index}
                            className={classNames.join(' ')}
                            data-index={index}
                        >

                            {renderContent && renderContent({
                                slide,
                                index,
                                activeSlide,
                                isActive: isActive(index, activeSlide),
                                isPrev: isPrev(index, activeSlide),
                                isNext: isNext(index, activeSlide)
                            })}

                            {type && type === 'images' && <img src={slide.url} alt={slide.alt} className={styles.slideImage} />}

                            {!renderContent && !type && <p>You should need to pass the `renderContent` function with your custom component</p>}

                        </div>

                    )

                })}

            </div>

            {!buttons && (
                <>
                    <button
                        onClick={handleNext}
                        className={[styles.button, styles.btnNext].join(' ')}
                    >
                        <FiArrowRightCircle className={styles.icon} />
                    </button>

                    <button
                        onClick={handlePrev}
                        className={[styles.button, styles.btnPrev].join(' ')}
                    >
                        <FiArrowLeftCircle className={styles.icon} />
                    </button>
                </>
            )}

            {buttons && (
                <>
                    {buttons.next && <buttons.next onClick={handleNext} />}
                    {buttons.prev && <buttons.prev onClick={handlePrev} />}
                </>
            )}

        </div>
    )
}

type Classes = {
    container?: string,
    slide?: string,
    wrapper?: string,
}

interface CarouselProps {
    slides: Array<object>
    renderContent?: (props: any) => JSX.Element
    classes?: Classes
    type?: "images" | "content"
    [key: string]: any
}

export default Carousel;