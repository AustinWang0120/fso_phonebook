const Notification = ({message, messageType}) => {
  if (message === null) {
    return null
  }

  // messageType: "notification" || "error"
  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default Notification
