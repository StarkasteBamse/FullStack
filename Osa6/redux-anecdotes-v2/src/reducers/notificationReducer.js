const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const hideNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: ''
  }
}

export default notificationReducer