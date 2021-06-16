const INITIAL_STATE = {
  activeTab: 1,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, activeTab: state.activeTab + 1 };

    case "DECREMENT":
      return { ...state, activeTab: state.activeTab - 1 };
    default:
      return state;
  }
};
