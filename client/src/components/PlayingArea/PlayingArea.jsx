/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import styles from './PlayingArea.module.css'
import { Minion } from '../../components';
import itemTypes from '../../constants';
import { useDrop } from 'react-dnd';

const PlayingArea = (props) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: itemTypes.CARD,
        drop: (item, monitor) => {

            const boundingClientRect = document.querySelector('[data-testid="dropBoard"]').getBoundingClientRect();
            const boardMiddleX = boundingClientRect.width / 2;
            const mousePosition = monitor.getClientOffset();
            const cardMiddleX = mousePosition.x - boundingClientRect.left;
            
            if (cardMiddleX < boardMiddleX) {
                item.playCard(item.card, 0);
            } else {
                item.playCard(item.card, 1);
            }

        },
        
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        
        }),
    }));

    const { board } = props;

    const minions = board.map((card, i) => (
        card ? <Minion card={card} key={i} /> : <div key={i} />
    ));

    return (
        <div data-testid="dropBoard" ref={drop} className='flex flex-row items-center justify-center w-full h-full relative pt-32'>
            { minions }
            {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
        </div>
    )
}

export default PlayingArea;