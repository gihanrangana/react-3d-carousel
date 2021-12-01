import React from 'react'
import { SiEnvato } from 'react-icons/si'
import { SliderTypes } from 'src/types';

import styles from './Header.module.scss'

const Header: React.FC<HeaderProps> = (props) => {

    const { setActiveSlider, active } = props;

    return (
        <div className={styles.header}>

            <div className={styles.navContainer}>

                <button
                    className={[
                        styles.navItem,
                        active === SliderTypes.SLIDER_CONTENT ? styles.active : ''
                    ].join(' ')}
                    onClick={() => setActiveSlider(SliderTypes.SLIDER_CONTENT)}
                >
                    Content Slider
                </button>

                <button
                    className={[
                        styles.navItem,
                        active === SliderTypes.SLIDER_IMAGE ? styles.active : ''
                    ].join(' ')}
                    onClick={() => setActiveSlider(SliderTypes.SLIDER_IMAGE)}
                >
                    Image Slider
                </button>

            </div>

            <a href="https://codecanyon.net/">
                <SiEnvato size={24} color={"#fff"} />
            </a>

        </div>
    )
}

interface HeaderProps {
    [key: string]: any;
}

export default Header