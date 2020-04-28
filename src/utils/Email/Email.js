function Email (name, email, message) {
    const data = {
        name,
        email,
        message
    }
    // fetch('http://localhost:3333/send', {
    fetch('http://172.31.92.96:3333/send', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
}

export default Email
