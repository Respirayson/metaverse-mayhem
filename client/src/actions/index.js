import playerActions from './playerActions';
import gameActions from './gameActions';
import beforeGameActions from './beforeGameActions';

// Create an object named allActions that contains references to the action modules
const allActions = {
  playerActions,
  gameActions,
  beforeGameActions,
};

// Export the allActions object as the default export of the module
export default allActions;
