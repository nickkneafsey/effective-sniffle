export default function({ dispatch }) {
  return next => action => {
    // If action does not have a payload or payload does not have .then
    if(!action.payload || !action.payload.then) {
      return next(action);
    }
    // Make sure the action's promise resolves
    action.payload
      .then(function(response) {
        // Create new action with the old type
        const newAction = { ...action, payload: response }
        // dispatch means send it through all middleware again
        dispatch(newAction);
      });
  };
}
