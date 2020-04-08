import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Form, Input, Row, Col, Button, Select, Radio, Checkbox} from 'antd'
import './lectures-list.scss'

const { TextArea } = Input
const { Option } = Select

const LectureForm = () => {

  const [values, setValues] = useState()

  function onChange(checkedValues) {
    setValues(checkedValues)
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
        // haveLecturedBefore: '',
        // activityType: '',
        // activityCategory: '',
        activityTitle: '',
        activityDescription: '',
      },

      onSubmit: values => {
        // console.log(values)
      },
    })

    const { haveLecturedBefore, activityType, activityCategory } = formik.values
    const checkedValues = {haveLecturedBefore, activityType, activityCategory: values}
    formik.values = Object.assign(checkedValues, formik.values)
    console.log('formik.values', formik.values)
    console.log('useState values', values)
    return (
      <div className='listed'>
        <Row>
          <Col span={16} offset={4}>
            <h2>Submissão de atividades</h2>
            <p>Para participar, basta preencher o formulário e aguardar o contato da equipe organizadora do evento.</p>
          </Col>
        </Row>
        <Row style={{marginBottom: 30}}>
          <Col span={14} offset={5}>
            <Form onFinish={formik.handleSubmit}
            // {...layout}
            layout="vertical"
            >

              {/* Nome completo */}
              
              <Form.Item
                label="Nome completo:"
                name="name"
                // rules={[{ required: true, message: 'Por favor, insira seu nome completo!' }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </Form.Item>

              {/* Email */}

              <Form.Item
                label="Email:"
                name="email"
                // rules={[{ required: true, message: 'Por favor, insira um email válido!' }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Form.Item>

              {/* RG */}
              
              <Form.Item
                label="RG:"
                name="rg"
                // rules={[{ required: true, message: 'Por favor, insira um RG válido!' }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.rg}
                />
              </Form.Item>

              {/* Cpf */}
              <Form.Item
                label="CPF:"
                name="cpf"
                // rules={[{ required: true, message: 'Por favor, insira um CPF válido!' }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.cpf}
                />
              </Form.Item>

              {/* Telefone celular */}

              <Form.Item
                label="Telefone celular:"
                name="cellphone"
                // rules={[{ required: true, message: 'Por favor, insira um número de celular válido!' }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.cellphone}
                />
              </Form.Item>

              {/* Endereço */}

              <Form.Item
                label="Endereço:"
                name="adress"
                // rules={[{ required: true, message: 'Por favor, insira um endereço válido!' }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.adress}
                />
              </Form.Item>

              {/* CEP */}

              <Form.Item
                label="CEP:"
                name="cep"
                // rules={[{ required: true, message: 'Por favor, insira um CEP válido!' }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.cep}
                />
              </Form.Item>

              {/* Minibiografia */}

              <Form.Item
                label="Minibiografia:"
                name="miniBio"
              >
                <TextArea 
                  rows={4}
                  onChange={formik.handleChange}
                  value={formik.values.miniBio}
                />
              </Form.Item>

              {/* Linkedin */}

              <Form.Item
                label="Linkedin:"
                name="linkedin"
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.linkedin}
                />
              </Form.Item>

              {/* Facebook */}

              <Form.Item
                label="Facebook:"
                name="facebook"
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.facebook}
                />
              </Form.Item>

              {/* Twitter */}

              <Form.Item
                label="Twitter:"
                name="twitter"
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.twitter}
                />
              </Form.Item>

              {/* Instagram */}

              <Form.Item
                label="Instagram:"
                name="instagram"
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.instagram}
                />
              </Form.Item>

              {/* Youtube */}

              <Form.Item
                label="Youtube:"
                name="youtube"
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.youtube}
                />
              </Form.Item>

              {/* Link de algum trabalho relevante */}
              <Form.Item
                label="Link de algum trabalho relevante:"
                name="portfolio"
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.portfolio}
                />
              </Form.Item>

              {/* Já ministrou alguma atividade em eventos?  */}
              <Form.Item name="haveLecturedBefore" label="Já ministrou alguma atividade em eventos?" 
              // rules={[{ required: true, message: 'Por favor, nos conte um pouquinho sobre você!' }]}
              >
                <Select
                  placeholder="Selecione uma opção"
                  onChange={onChange}
                  // {...formik.getFieldProps("haveLecturedBefore")}
                >
                  <Option value={"Sim"} >Sim</Option>
                  <Option value="Não" >Não</Option>
                </Select>
              </Form.Item>

              {/* Tipo de atividade proposta */}

              <Form.Item name="activityType" label="Tipo de atividade proposta:" 
              // rules={[{ required: true, message: 'Por favor, informe um tipo de atividade' }]}
              >
                <Radio.Group style={{textAlign: 'left'}} 
                  onChange={onChange} 
                >
                  <Radio style={{display: 'block'}} value="Palestra" >Palestra (1 palestrante)</Radio>
                  <Radio style={{display: 'block'}} value="Painel" >Painel (1 moderador + até 3 painelistas)</Radio>
                  <Radio style={{display: 'block'}} value="Workshop" >Workshop (1 palestrante + até 2 facilitadores)</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Segmento da atividade proposta */}

              <Form.Item name="activityCategory" label="Categoria da atividade proposta:" 
                // rules={[{ required: true, message: 'Por favor, informe pelo menos uma categoria!' }]}
              >
                <Checkbox.Group style={{textAlign: 'left'}} 
                  onChange={onChange}
                >
                  <Checkbox style={{display: 'block'}, {marginLeft: '8px'}} value="Segurança" >Segurança</Checkbox>
                  <Checkbox style={{display: 'block'}} value="Criatividade/ Design / Entretenimento/ Marketing Digital" >Criatividade/Design/ Entretenimento/Marketing Digital</Checkbox>
                  <Checkbox style={{display: 'block'}} value="Empreendedorismo" >Empreendedorismo</Checkbox>
                  <Checkbox style={{display: 'block'}} value="IoT" >IoT (Internet of Things)</Checkbox>
                  <Checkbox style={{display: 'block'}} value="Realidade Virtual/Realidade Aumentada" >Realidade Virtual/Realidade Aumentada</Checkbox>
                  <Checkbox style={{display: 'block'}} value="Biohacking/Cyborg" >Biohacking/Cyborg</Checkbox>
                  <Checkbox style={{display: 'block'}} value="Big Data e Machine Learning" >Big Data e Machine Learning</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              {/* Título da atividade proposta */}

              <Form.Item
                label="Título da atividade proposta:"
                name="activityTitle"
                // rules={[{ required: true, message: 'Por favor, insira um título para a atividade!' }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.activityTitle}
                />
              </Form.Item>

              {/* Descrição da atividade proposta */}

              <Form.Item
                label="Descrição da atividade proposta:"
                name="activityDescription"
                // rules={[{ required: true, message: 'Por favor, insira uma descrição para a atividade!' }]}
              >
                <TextArea 
                  rows={4}
                  onChange={formik.handleChange}
                  value={formik.values.activityDescription}
                />
              </Form.Item>

              {/* Submit button */}

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