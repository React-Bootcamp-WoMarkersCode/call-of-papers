import { notification } from 'antd'

const openNotification = (type, description) => {
  notification[type]({
    message: type === 'success' ? 'Sucesso!' : 'Ops! Algo deu errado!',
    description: description,
    duration: 3
  })
}

export const copyToCliboard = () => {
    // https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard
    var dummy = document.createElement('input'),
    text = window.location.href

    document.body.appendChild(dummy)
    dummy.value = text
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)

    openNotification('success', 'Copiado para a área de transferência')
}
