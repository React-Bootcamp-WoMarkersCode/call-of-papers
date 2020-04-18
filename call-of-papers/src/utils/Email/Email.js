function Email (name, email, message) {
    console.log("entrou aqui")
    const data = {
        name: name,
        email: email,
        message: message
    }
    fetch('http://localhost:3333/send', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
}

export default Email