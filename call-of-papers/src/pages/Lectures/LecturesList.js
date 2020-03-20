import React from 'react';
import { Layout, List} from 'antd';
import './lectures-list.css';
import data from './lectures-list-test.json';


// const data = [
//     {
//       "title": "Lecture Title 30",
//       "status": "in-analysis",
//       "description": "Proident ullamco enim dolore veniam ad adipisicing amet. Cupidatat laborum consequat adipisicing eiusmod ut esse. Non est amet nisi aliquip cillum adipisicing laboris. Incididunt id in voluptate deserunt excepteur velit laboris sint nisi irure id tempor aute.\r\n"
//     },
//     {
//       "title": "Lecture Title 29",
//       "status": "approved",
//       "description": "Ex est laboris fugiat qui ex qui proident consequat et aliquip non sint exercitation. Magna tempor ex irure mollit ut velit cillum enim. Nisi non consequat consequat exercitation officia anim consectetur. Id Lorem ut velit pariatur commodo voluptate aute. Do Lorem id reprehenderit amet elit mollit magna nostrud culpa. Do pariatur ipsum sit fugiat esse. Minim consectetur veniam est aliquip amet nostrud.\r\n"
//     },
//     {
//       "title": "Lecture Title 26",
//       "status": "rejected",
//       "description": "Dolore nisi enim deserunt nostrud consequat ex amet nostrud qui aliqua ex deserunt excepteur velit. Officia elit mollit sit qui aliqua anim enim est qui culpa sunt sit sint. Aliqua esse mollit ea aliqua tempor quis enim amet id velit ea velit voluptate id. Sunt culpa consectetur Lorem consectetur do magna sunt culpa nostrud laboris excepteur do excepteur. Eiusmod duis sit officia aute Lorem. Occaecat sunt ex esse fugiat.\r\n"
//     },
//     {
//       "title": "Lecture Title 31",
//       "status": "in-analysis",
//       "description": "Elit magna ex adipisicing id consequat ut. Nulla elit non deserunt est et pariatur minim ullamco veniam quis officia mollit minim eu. Adipisicing ea sit proident occaecat excepteur consectetur commodo eiusmod commodo culpa ipsum reprehenderit enim. Officia id nulla do laborum irure sunt ex nisi voluptate do do commodo adipisicing. Et Lorem laboris elit in pariatur mollit duis deserunt cillum.\r\n"
//     },
//     {
//       "title": "Lecture Title 26",
//       "status": "in-analysis",
//       "description": "Ipsum amet fugiat excepteur nisi laboris ipsum eiusmod aute laboris. Duis eu nulla mollit reprehenderit culpa elit magna commodo elit nostrud non. Veniam incididunt enim commodo minim labore Lorem. Pariatur dolor consectetur do incididunt consectetur aliquip deserunt dolore non minim.\r\n"
//     },
//     {
//       "title": "Lecture Title 21",
//       "status": "rejected",
//       "description": "Anim enim aliqua enim id proident magna ipsum nisi fugiat. Eu ad nisi tempor consequat eu nulla aliquip eu. Quis veniam voluptate dolore elit officia aute. Pariatur sit dolore cupidatat irure aliqua esse ex proident veniam laboris cillum nulla veniam sint. Elit in magna tempor aute amet. Lorem commodo ad exercitation fugiat cillum elit irure pariatur labore.\r\n"
//     },
//     {
//       "title": "Lecture Title 29",
//       "status": "in-analysis",
//       "description": "Exercitation voluptate Lorem incididunt ut. Esse aliqua irure veniam ipsum laboris ipsum ex culpa ullamco est cillum est non sit. Non consequat Lorem minim dolor et ad ea consequat veniam commodo cillum eu adipisicing excepteur. Nostrud incididunt fugiat occaecat labore nulla commodo ullamco qui excepteur non eiusmod. Sint id ipsum fugiat Lorem veniam qui proident ullamco sit ut officia. Irure elit cillum in adipisicing est sunt consectetur culpa adipisicing est.\r\n"
//     },
//     {
//       "title": "Lecture Title 30",
//       "status": "rejected",
//       "description": "Excepteur adipisicing laboris amet veniam qui id duis culpa aute in exercitation irure do. Dolore qui adipisicing laboris dolore enim ad est veniam cupidatat irure eiusmod. Deserunt et labore cupidatat laboris. Lorem et sit esse eu. Veniam laboris dolore occaecat sit nulla laboris.\r\n"
//     },
//     {
//       "title": "Lecture Title 33",
//       "status": "in-analysis",
//       "description": "Exercitation anim occaecat et tempor minim. Ad occaecat ex irure magna aliqua. Dolore dolor tempor dolore esse. Commodo nisi officia quis tempor amet ipsum in labore elit.\r\n"
//     },
//     {
//       "title": "Lecture Title 26",
//       "status": "in-analysis",
//       "description": "Officia sit et adipisicing deserunt pariatur id labore commodo culpa quis aute ex tempor sit. Pariatur nulla consectetur aliquip aliqua nisi exercitation duis sunt. Anim elit commodo ullamco aliquip. Veniam ipsum irure fugiat magna. Dolore exercitation laborum nostrud sunt consectetur. Ut labore adipisicing officia irure esse aute adipisicing do cupidatat aute anim.\r\n"
//     },
//     {
//       "title": "Lecture Title 39",
//       "status": "rejected",
//       "description": "Culpa cupidatat minim consectetur enim esse sint id. Est est qui duis Lorem veniam consectetur irure cillum minim sit aliqua. Aliqua fugiat ex non ex ipsum. Commodo sunt nisi minim dolore laborum minim nostrud sit minim incididunt esse minim Lorem. Mollit sunt pariatur aliquip consequat consectetur quis tempor mollit aliqua Lorem eu Lorem sunt elit.\r\n"
//     }
//   ];

const LecturesList = () => (
    <>
    <div className="div-content">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <table>
                  <tr></tr>
                  <tr>
                    <a href="womakerscode.org">
                        <td className="listed-lecture">
                            <h3>{item.title}</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi felis, molestie et odio rhoncus, luctus viverra nisi.</p>
                        </td>
                        <td className={item.status + " lecture-status"}>
                            {item.status.toUpperCase()}
                        </td>
                    </a>
                  </tr>
              </table>
            </List.Item>
          )}
        />
    </div>
    </>
)

export default LecturesList;
