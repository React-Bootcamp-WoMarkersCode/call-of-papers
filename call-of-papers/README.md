# Projeto: Call of papers 
Plataforma que conecta eventos da comunidade a voluntários(as).

Desenvolvedoras:
[Alessandra](https://github.com/Alessandra-Nastassja),
[Fernanda](https://github.com/arfernanda),
[Isa](https://github.com/IsabellaSoares),
[Kathleen](https://github.com/kathleenpallotta), 
[Lia](), 
[Mariana]() e
[Olívia](https://github.com/oliviaresende).

Orientadoras:
[Adriele](),
[Becca](),
[Laís](https://github.com/lalizita) e
[Marília](https://github.com/GabrieleSuzart)

#### React bootcamp @WoMakersCode 🦄

**** 
## *Sobre o projeto* ⭐️
### *Principais funcionalidades:*

- Gerenciamento de eventos da comunidade;
- Visualização e submissão de palestras;
- Criação de grupos.

### *Wireframe:* 

Para ver as definições das **páginas**, clique em [aqui]()

### *Tecnologias usadas:*

- [React](https://pt-br.reactjs.org/docs/getting-started.html) e [Redux](https://redux.js.org/introduction/getting-started);
- React router;
- React PDF;
- [Ant Design](https://ant.design/docs/react/introduce);
- [Formik](https://jaredpalmer.com/formik/docs/api/formik).

****
## *Como instalar e rodar ?* 🚀
###  *Pré-requisitos:*
1. Ter o **[Node js](https://nodejs.org/en/) instalado** e junto dele a **[NPM](https://www.npmjs.com/)**;

2. **Clonar o repositório** em sua máquina, usando comando abaixo em seu terminal:

```
  git clone https://github.com/React-Bootcamp-WoMarkersCode/call-of-papers.git
```

3. Após clonar, entrar na pasta **call-of-papers**, utilizando o comando abaixo no terminal:

```
  cd call-of-papers
``` 

4. Agora basta **instalar as dependências** do seu projeto, digitando no terminal:

```
  npm install
```

5. E por ultimo dar o comando para **rodar** seu projeto:

```
  npm start
```

 > *Obs: O projeto irá abrir em seu navegador, rodando no http://localhost:3000*
 
 ****
 
 ### Como funciona Json-server ? 🚀

Baseado em um único json que contém **events, lectures e profile**. Pode-se efetuar o GET,POST, PUT e DELETE. Basta apenas escrever **http://localhost:3001/events**, como por exemplo. 

> *Obs.: Ao rodar o projeto, ele irá criar uma API fake em **http://localhost:3001/** e o front **http://localhost:3000/***
 
*Exemplo:*

Request | URL | Detalhes
-- | -- | --
GET | /events | Busca todos os eventos
GET | /events/1 | Busca um evento
GET | /events?local=Online | Busca um evento que seja online
GET | /events?_limit=2 | Busca apenas dois eventos
GET | /events?_limit=2&_page=1 | Busca apenas dois eventos por página
POST | /events | Salvar um evento
PUT | /events/1 | Editar os dados do evento
DELETE | /events/1 | Remove o evento


*Exemplo de filtro - Palestra*:

```
/lectures?status=approved&_limit=10&_page=1
```

> *Obs.:  Realiza filtro nas palestras aprovadas, trazendo apenas 10 por página*

 ****
 ## Referências:
 [Meetup](https://www.meetup.com/apps/)
 [Sympla](https://www.sympla.com.br/)
 [Eventbrite](https://www.eventbrite.com.br/)
 [Ticket360](https://www.ticket360.com.br/)
 
 [Tutorial - Json server](https://code.tutsplus.com/pt/tutorials/fake-rest-api-up-and-running-using-json-server--cms-27871)
 [Filtros - Json server](https://code.tutsplus.com/pt/tutorials/fake-rest-api-up-and-running-using-json-server--cms-27871)
