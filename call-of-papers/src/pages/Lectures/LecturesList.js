import React from 'react';
import { Layout, List} from 'antd';
import './lectures-list.scss';
import data from './lectures-list-test.json';

const LecturesList = () => (
    <>
    <div className="listed">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <table>
                  <tr></tr>
                  <tr>
                    <a href="womakerscode.org">
                        <td className="listed__lecture">
                            <h3>{item.title}</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi felis, molestie et odio rhoncus, luctus viverra nisi.</p>
                        </td>
                        <td className={"listed__lecture__status listed__lecture__status--" + item.status}>
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
