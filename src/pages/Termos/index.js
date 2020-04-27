import React from 'react'
import { Row, Col, Typography, Descriptions } from 'antd'

const { Title } = Typography

const Termos = () => {
  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <Title>Termos e condições de uso do site</Title>
          <Descriptions title="O que você precisa saber para fazer uso da ferramenta" layout='vertical' style={{ textAlign: 'justify' }}>
            <Descriptions.Item label="1. Aceitação dos Termos e Condições de Uso" span={16}>
              <p>O uso da ferramenta <i>Sharing Talks</i> está condicionado à aceitação e ao cumprimento dos Termos e Condições de Uso descritos abaixo. Para fazer uso da Ferramenta é preciso: (i) ler atentamente os termos descritos abaixo; (ii) concordar expressamente com eles; e (iii) fornecer um endereço de email válido ao postar qualquer conteúdo no Site.</p>
              <p>Ao fazer uso da Ferramenta você (a partir de agora denominado Usuário) concorda que leu, entendeu e aceitou os termos, regras e condições aqui dispostos.</p>
              <p>A Ferramenta está disponível para aqueles com capacidade civil para utilizá-la. Caso o Usuário não possua capacidade para contratar ou utilizar a Ferramenta, quando for mencionado Usuário neste Termo será então entendido também que as declarações tenham sido prestadas por seu responsável legal.</p>
              <p>A <i>Sharing Talks</i> se reserva o direito de modificar a qualquer momento a apresentação, configuração e disponibilização da Ferramenta e ou do Site. O mesmo se aplica a estes Termos e Condições de Uso, estabelecidos como condição fundamental para a utilização do serviço.</p>
            </Descriptions.Item>
            <Descriptions.Item label="2. Descrição do serviço" span={16}>
              A <i>Sharing Talks</i> oferece as usuários uma ferramenta que permite conectar palestrantes e eventos.
            </Descriptions.Item>
            <Descriptions.Item label="3. Gratuidade" span={16}>
              A Ferramenta é oferecida ao Usuário de forma gratuita. Os valores referentes à utilização dos serviços necessários ao acesso à Internet, entre outros, são de responsabilidade exclusiva do Usuário.
            </Descriptions.Item>
            <Descriptions.Item label="3. Utilização da Ferramenta" span={16}>
              <p>O Usuário reconhece que é responsável por quaisquer informações falsas que possam ser prestadas para a utilização da ferramenta, bem como por qualquer conteúdo inserido pelo mesmo no Site. O Usuário isenta a <i>Sharing Talks</i> de qualquer responsabilidade quanto à veracidade dos dados pessoais fornecidos por ele quando do uso da Ferramenta, bem como por qualquer violação a direitos de terceiros, ocorrida através da ferramenta no Site decorrentes de suas declarações.</p>
              <p>O usuário reconhece, ainda, que estes Termos e Condições de Uso da Ferramenta oferecida pela <i>Sharing Talks</i> devem ser observados e fielmente cumpridos, sob pena de cancelamento de bloqueio de utilização da Ferramenta e demais medidas cabíveis, caso os mencionados Termos forem violados ou descumpridos.</p>
            </Descriptions.Item>
            <Descriptions.Item label="5. Registro e dados pessoais" span={16}>
              <p>É dever do Usuário manter atualizados os dados pessoais fornecidos quando da utilização da Ferramenta.</p>
              <p>A <i>Sharing Talks</i> pode cancelar qualquer registro do Usuário, a qualquer momento e sem prévio aviso, assim que tiver conhecimento, e a seu exclusivo critério, se o Usuário descumprir, intencionalmente ou não, estes Termos e Condições de Uso, ou violar leis e regulamentos federais, estaduais e/ou municipais, ou violar os princípios legais, a moral e os bons costumes.</p>
              <p>Os Usuários que tiverem seus registros cancelados não poderão mais utilizar a Ferramenta.</p>
            </Descriptions.Item>
            <Descriptions.Item label="6. Regras de conduta do Usuário" span={16}>
              <p>O Usuário se compromete a não utilizar a Ferramenta para a publicação, criação, armazenamento e/ou divulgação de:</p>
              <ol type="a">
                <li>Conteúdo abusivo, como textos, fotos e/ou vídeos que tenham caráter difamatório, discriminatório, obsceno, ofensivo, ameaçador, abusivo, vexatório, prejudicial, que contenha expressões de ódio contra pessoas ou grupos, ou que contenha pornografia infantil, pornografia explícita ou violenta, conteúdo que possa ser danoso a menores, que contenha insultos ou ameaças religiosas ou raciais, ou que incentive danos morais (incluindo os corporais) e patrimoniais, ou que possa violar qualquer direito de terceiro, notadamente os direitos humanos.</li>
                <li>Banners publicitários e/ou qualquer tipo de comércio eletrônico que seja considerado ilícito, assim entendidos os que sejam contrários à legislação ou ofendam direitos de terceiros.</li>
                <li>Qualquer tipo de material (textos, fotos e/ou vídeos) protegido por direitos autorais, copyright ou que, por qualquer razão, violem direitos de terceiros.</li>
                <li>Informações difamatórias e caluniosas ou que sejam contrárias à honra, à intimidade pessoal e familiar ou à imagem das pessoas (inclusive de pessoa jurídicas, entidades e organizações e ela equiparadas).</li>
                <li>Material que incite à violência e à criminalidade, bem como à pirataria de produtos.</li>
                <li>Conteúdo que provoque, por suas características (como extensões e formatos de arquivos) danos ao sistema da <i>Sharing Talks</i>.</li>
              </ol>
              <p>O Usuário concorda que, ao usar a Ferramenta, não irá:</p>
              <ul>
                <li>violar qualquer um destes Termos e Condições de Uso;</li>
                <li>praticar falsidade, assim entendidas a falsidade de informações (i.e: divulgação proposital e voluntária de informações que o Usuário saiba ser falsa ou que sejam notoriamente falsas) e a falsidade ideológica;</li>
                <li>cometer fraude;</li>
                <li>violar ou infringir direitos de propriedade intelectual, direitos fiduciários ou contratuais, direitos de privacidade ou publicidade de outros;</li>
                <li>deixar de cumprir com quaisquer leis, normas, regras, princípios e regulamentações aplicáveis;</li>
                <li>ajudar qualquer terceiro a realizar qualquer uma das ações vedadas por estes Termos e Condições de Uso.</li>
              </ul>
              <p>A <i>Sharing Talks</i> tem o direito de remover o(s) evento(s) e palestra(s) de Usuários se considerar que esse conteúdo é impróprio ou inadequado, que viole estes Termos e Condições de Uso, a legislação ou qualquer direito de terceiros.</p>
            </Descriptions.Item>
            <Descriptions.Item label="7. Direitos de Propriedade Intelectual" span={16}>
              <p>O Usuário reconhece e declara que em qualquer contribuição submetida para o Site, o material correspondente é de sua exclusiva criação, não constituindo violação de direitos autorais, marcas, segredos, direitos de personalidade, incluindo honra, intimidade, vida privada e a imagem das pessoas, direitos patrimoniais e quaisquer outros direitos de terceiros.</p>
              <p>Desde que citada a fonte (inclusive o nome do autor, quando possível e aplicável) e dentro das condições e limites previstos em lei, notadamente a Lei de Direitos Autorais (Lei n.º 9.610/98), o Usuário não pode reproduzir, publicar, apresentar, alugar, oferecer ou expor qualquer cópia de qualquer conteúdo pertencente à Abril sem o consentimento da Abril ou, no caso de conteúdo de autoria de terceiros, sem o consentimento do autor ou autora.</p>
              <p>O Usuário se compromete a cumprir todas as leis nacionais e internacionais referentes aos Direitos de Propriedade Intelectual.</p>
            </Descriptions.Item>
            <Descriptions.Item label="8. Legislação aplicável" span={16}>
            Estes Termos e Condições de Uso são governados e interpretados segundo as leis da República Federativa do Brasil e todas as disputas, ações e outros assuntos relacionados serão determinados de acordo com essa legislação.
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  )
}

export default Termos
