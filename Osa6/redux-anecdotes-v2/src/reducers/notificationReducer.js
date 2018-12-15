const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

const showNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

const hideNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: ''
  }
}

export const notify = (notification, time) => {
  return dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationReducer