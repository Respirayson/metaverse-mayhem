/* eslint-disable react/prop-types */
import styles from './PlayingArea.module.css'
import { Minion } from '../../components';
import itemTypes from '../../constants';
import { useDrop } from 'react-dnd';
import { useState } from 'react';

import { motion } from 'framer-motion';
import { slideAnimation } from "../../utils/motion"
import PlayerMinion from '../../containers/PlayerMinion';

const PlayingArea = (props) => {

    const [boardLength, setBoardLength] = useState(0)
    const { board } = props;
    
    const [cardLastPlayed, setCardLastPlayed] = useState();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: itemTypes.CARD,
        drop: (item, monitor) => {
            setBoardLength(boardLength + 1)
            setCardLastPlayed(item.card)
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
    
    const minions = board.map((card, i) => (
        card 
        ? card === cardLastPlayed ? 
            <motion.div key={card["id"]} {...slideAnimation("up")}> <PlayerMinion card={card} key={i} /> </motion.div> : <PlayerMinion card={card} key={i} />
        : <div key={i} />
    ));

    return (
        <div data-testid="dropBoard" ref={drop} className='flex flex-row items-center justify-center w-full h-[180px] relative z-10'>
            { minions }
            {isOver &&
          <div className={ styles.PlayingArea } />
        }
        </div>
    )
}

export default PlayingArea;