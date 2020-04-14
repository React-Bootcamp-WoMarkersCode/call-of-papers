import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Form, Input, Row, Col, Button, Select, Radio, Checkbox} from 'antd'

import './lectures-list.scss'

const { TextArea } = Input
const { Option } = Select

const LectureForm = () => {

  const environment = 'http://localhost:3001'

  const [valuesRadio, setRadioValues] = useState()
  const [valuesCheck, setCheckValues] = useState()
  const [valuesSelect, setSelectValues] = useState()
  const [imageUpload, setImageUpload] = useState()

  const onChangeSelect = (selectValues) => {
    setSelectValues(selectValues)
  }
  const onChange = (radioValues) => {
    setRadioValues(radioValues.target.value)
  }
  const onChangeCheck = (checkedValues) => {
    setCheckValues(checkedValues)
  }

  const onChangeHandler = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      setImageUpload(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      rg: '',
      cpf: '',
      cellphone: '',
      adress: '',
      cep: '',
      miniBio: '',
      linkedin: '',
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      portfolio: '',
      activityTitle: '',
      activityDescription: '',
      uploadedImage: '',
    },

    onSubmit: (values) => {
      fetch(`${environment}/lectures`, {
        method: 'post',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(values)
        }).then(function (response) {
            alert('Atividade cadastrada com sucesso!')
            return response.json();
        }).catch(function (error) {
            alert(`Erro ao cadastrar: ${error}`)
        })
    },
  })

  formik.values = Object.assign(
    formik.values,
    {
      'uploadedImage': imageUpload
    },
    {
      'activityType': valuesRadio
    },
    {
      'activityCategory':valuesCheck
    },
    {
      'haveLecturedBefore': valuesSelect
    }, {
      'id': (Math.floor(Math.random() * 1000)).toString()
    }
  )

  return (
    <div className='listed'>
      <Row>
        <Col span={16} offset={4}>
          <h2>Submissão de atividades</h2>
          <p>Para participar, basta preencher o formulário e aguardar o contato da equipe organizadora do evento.</p>
        </Col>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col span={14} offset={5}>
          <Form onFinish={formik.handleSubmit}
            // {...layout}
            layout="vertical"
          >

            {/* Nome completo */}

            <Form.Item
              label="Nome completo:"
              name="name"
            rules={[{ required: true, message: 'Por favor, insira seu nome completo!' }]}
            >
              <Input
                {...formik.getFieldProps("name")}
              />
            </Form.Item>

            {/* Email */}

            <Form.Item
              label="Email:"
              name="email"
            rules={[{ type: 'email', required: true, message: 'Por favor, insira um email válido!' }]}
            >
              <Input
                {...formik.getFieldProps("email")}
              />
            </Form.Item>

            {/* RG */}

            <Form.Item
              label="RG:"
              name="rg"
            rules={[{ required: true, message: 'Por favor, insira um RG válido!' }]}
            >
              <Input
                maxLength={9}
                {...formik.getFieldProps("rg")}
              />
            </Form.Item>

            {/* Cpf */}
            <Form.Item
              label="CPF:"
              name="cpf"
            rules={[{ required: true, message: 'Por favor, insira um CPF válido!' }]}
            >
              <Input
                maxLength={11}
                {...formik.getFieldProps("cpf")}
              />
            </Form.Item>

            {/* Telefone celular */}

            <Form.Item
              label="Telefone celular:"
              name="cellphone"
            rules={[{ required: true, message: 'Por favor, insira um número de celular válido!' }]}
            >
              <Input
                maxLength={11}
                {...formik.getFieldProps("cellphone")}
              />
            </Form.Item>

            {/* Endereço */}

            <Form.Item
              label="Endereço:"
              name="adress"
            rules={[{ required: true, message: 'Por favor, insira um endereço válido!' }]}
            >
              <Input
                {...formik.getFieldProps("adress")}
              />
            </Form.Item>

            {/* CEP */}

            <Form.Item
              label="CEP:"
              name="cep"
            rules={[{ required: true, message: 'Por favor, insira um CEP válido!' }]}
            >
              <Input
                maxLength={11}
                {...formik.getFieldProps("cellphone")}
              />
            </Form.Item>

            {/* Minibiografia */}

            <Form.Item
              label="Minibiografia:"
              name="miniBio"
            >
              <TextArea
                rows={4}
                {...formik.getFieldProps("miniBio")}
              />
            </Form.Item>

            {/* Linkedin */}

            <Form.Item
              label="Linkedin:"
              name="linkedin"
            >
              <Input
                {...formik.getFieldProps("linkedin")}
              />
            </Form.Item>

            {/* Facebook */}

            <Form.Item
              label="Facebook:"
              name="facebook"
            >
              <Input
                {...formik.getFieldProps("facebook")}
              />
            </Form.Item>

            {/* Twitter */}

            <Form.Item
              label="Twitter:"
              name="twitter"
            >
              <Input
                {...formik.getFieldProps("twitter")}
              />
            </Form.Item>

            {/* Instagram */}

            <Form.Item
              label="Instagram:"
              name="instagram"
            >
              <Input
                {...formik.getFieldProps("instagram")}
              />
            </Form.Item>

            {/* Youtube */}

            <Form.Item
              label="Youtube:"
              name="youtube"
            >
              <Input
                {...formik.getFieldProps("youtube")}
              />
            </Form.Item>

            {/* Link de algum trabalho relevante */}
            <Form.Item
              label="Link de algum trabalho relevante:"
              name="portfolio"
            >
              <Input
                {...formik.getFieldProps("portfolio")}
              />
            </Form.Item>

            {/* Já ministrou alguma atividade em eventos?  */}
            <Form.Item name="haveLecturedBefore" label="Já ministrou alguma atividade em eventos?"
            >
              <Select
                placeholder="Selecione uma opção"
                onChange={onChangeSelect}
              // {...formik.getFieldProps("haveLecturedBefore")}
              >
                <Option value={"Sim"} >Sim</Option>
                <Option value="Não" >Não</Option>
              </Select>
            </Form.Item>

            {/* Tipo de atividade proposta */}

            <Form.Item name="activityType" label="Tipo de atividade proposta:"
            rules={[{ required: true, message: 'Por favor, informe um tipo de atividade' }]}
            >
              <Radio.Group style={{ textAlign: 'left' }}
                onChange={onChange}
              >
                <Radio style={{ display: 'block' }} value="Palestra" >Palestra (1 palestrante)</Radio>
                <Radio style={{ display: 'block' }} value="Painel" >Painel (1 moderador + até 3 painelistas)</Radio>
                <Radio style={{ display: 'block' }} value="Workshop" >Workshop (1 palestrante + até 2 facilitadores)</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Segmento da atividade proposta */}

            <Form.Item name="activityCategory" label="Categoria da atividade proposta:"
            rules={[{ required: true, message: 'Por favor, informe pelo menos uma categoria!' }]}
            >
              <Checkbox.Group style={{ textAlign: 'left' }}
                onChange={onChangeCheck}
              >
                <Checkbox style={{ display: 'block' }, { marginLeft: '8px' }} value="Segurança" >Segurança</Checkbox>
                <Checkbox style={{ display: 'block' }} value="Criatividade/ Design / Entretenimento/ Marketing Digital" >Criatividade/Design/ Entretenimento/Marketing Digital</Checkbox>
                <Checkbox style={{ display: 'block' }} value="Empreendedorismo" >Empreendedorismo</Checkbox>
                <Checkbox style={{ display: 'block' }} value="IoT" >IoT (Internet of Things)</Checkbox>
                <Checkbox style={{ display: 'block' }} value="Realidade Virtual/Realidade Aumentada" >Realidade Virtual/Realidade Aumentada</Checkbox>
                <Checkbox style={{ display: 'block' }} value="Biohacking/Cyborg" >Biohacking/Cyborg</Checkbox>
                <Checkbox style={{ display: 'block' }} value="Big Data e Machine Learning" >Big Data e Machine Learning</Checkbox>
              </Checkbox.Group>
            </Form.Item>

            {/* Título da atividade proposta */}

            <Form.Item
              label="Título da atividade proposta:"
              name="activityTitle"
            rules={[{ required: true, message: 'Por favor, insira um título para a atividade!' }]}
            >
              <Input
                {...formik.getFieldProps("activityTitle")}
              />
            </Form.Item>

            {/* Descrição da atividade proposta */}

            <Form.Item
              label="Descrição da atividade proposta:"
              name="activityDescription"
            rules={[{ required: true, message: 'Por favor, insira uma descrição para a atividade!' }]}
            >
              <TextArea
                rows={4}
                {...formik.getFieldProps("activityDescription")}
              />
            </Form.Item>

            {/* Upload de imagem */}
            <Form.Item
              label="Upload de identidade visual da sua atividade:"
            >
              <input type="file" name="file" onChange={onChangeHandler}/>
            </Form.Item>
            {/* Botão de envio do formulário */}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default LectureForm
