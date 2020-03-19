import React from 'react';
import { Layout, List} from 'antd';
import './lectures-list.css';
import data from './lectures-list-test.json';

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
                    <a href="https://ant.design">
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
