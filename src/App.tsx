import React from 'react';
import { SliderTypes } from './types';

import styles from './App.module.scss';
import Header from './Component/Header/Header';
import ImageSlider from './Examples/ImageSlider/ImageSlider';

export default function App() {

    const [activeSlider, setActiveSlider] = React.useState(SliderTypes.SLIDER_CONTENT);

    return (
        <div className={styles.container}>

            <Header setActiveSlider={setActiveSlider} active={activeSlider} />

            <ImageSlider />

        </div>
    )
}