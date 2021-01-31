import React from 'react';

import styles from './App.module.scss';

export default function App() {

    return (
        <div className={styles.container}>

            <img src={require('./assets/images/logo.png')} alt="logo" className={styles.logo}/>
            <p className={styles.text}>This app created with create-sass-react-app.</p>
            
        </div>
    )
}