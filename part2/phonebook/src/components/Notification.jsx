const Notification = ({messageNotification}) => {
    const style = {
            color: messageNotification.type === 'success' ? 'green' : 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
    }

    console.log("messageNotification visible: ", messageNotification)
    if(messageNotification.visible){
        return (<div style={style}> 
        {console.log("Message visible render", messageNotification)}
            {messageNotification.msg}
        </div>)
    }

    return ( 
     <div></div>
    )
}

export default Notification