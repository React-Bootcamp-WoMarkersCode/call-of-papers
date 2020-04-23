export const copyToCliboard = () => {
    // https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard
    var dummy = document.createElement('input'),
    text = window.location.href

    document.body.appendChild(dummy)
    dummy.value = text
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
}