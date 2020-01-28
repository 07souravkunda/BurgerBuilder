import React from 'react';
import Styles from './Spinner.module.css';

const spinner = () => {
    return (
        <div className={Styles.Spinner}><div></div><div>
            </div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}

export default spinner;