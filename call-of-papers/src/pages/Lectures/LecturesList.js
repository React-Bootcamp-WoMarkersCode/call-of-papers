import React from 'react'
import { List } from 'antd'
import { Link } from 'react-router-dom'
import './lectures-list.scss'
import data from './lectures-list-test.json'

const LecturesList = () => (
  <div className='listed'>
    <List
      pagination
      itemLayout='horizontal'
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <table>
            <tr></tr>
            <tr>
              <Link to={`/lectures/${item.id}`}>
                <td className='listed__lecture'>
                  <h3>{item.title}</h3>
                  <p>
                    {item.description}
                  </p>
                </td>
                <td className={'listed__lecture-status--' + item.status}>
                  {item.status.toUpperCase()}
                </td>
              </Link>
            </tr>
          </table>
        </List.Item>
      )}
    />
  </div>
)

export default LecturesList
