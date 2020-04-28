function Email (name, email, message) {
    const data = {
        name,
        email,
        message
    }
    fetch(`http://${process.env.REACT_APP_ENVIROMENT}:3333/send`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
}

export default Email
