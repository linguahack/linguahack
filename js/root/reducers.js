

export const changedView = (state, action) => ({...state, view: action.view, ...action.data})

