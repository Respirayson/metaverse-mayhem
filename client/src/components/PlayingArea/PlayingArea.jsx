/* eslint-disable react/prop-types */
import React from 'react'
import styles from './PlayingArea.module.css'
import { Minion } from '../../components';
import { useSelector } from 'react-redux';

const PlayingArea = (props) => {

    const { board } = props;

    const minions = board.map((card, i) => (
        card ? <Minion card={card} key={i} /> : <div key={i} />
    ));

    return (
        <div className='flex flex-row items-center justify-center'>
            { minions }
        </div>
    )
}

export default PlayingArea;