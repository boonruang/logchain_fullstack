import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import Moment from 'react-moment'
import './logchain.css'
import moment from 'moment'
import * as blockActions from '../../actions/block.action'
import { withRouter } from 'react-router-dom'
import SystemBar from '../systembar'

const Logchain = (props) => {
  useEffect(() => {
    callActions()

    setTimeout(() => {
      callJQuery()
    }, 100)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callActions = () => {
    dispatch(blockActions.getBlocks())
  }

  const callJQuery = () => {
    const script = document.createElement('script')
    script.src = `/js/content_logchain.js`
    script.async = true
    document.body.appendChild(script)
  }

  const blockReducer = useSelector(({ blockReducer }) => blockReducer)
  const dispatch = useDispatch()
  const { result, isFetching } = blockReducer

  // const mouseClick = () => {}

  const CreateRows = () => {
    try {
      return (
        !isFetching &&
        result != null &&
        result.map((item) => (
          <tr key={item.timestamp}>
            <td style={{ textAlign: 'center' }}>
              <Moment format="DD/MM/YYYY">{item.timestamp}</Moment>
            </td>
            <td>{item.user}</td>
            <td>{item.action}</td>
            <td>{item.api}</td>
            <td style={{ textAlign: 'center' }}>
              {moment
                .utc(
                  moment(item.logout, 'YYYY-MM-DD HH:mm:ss').diff(
                    moment(item.login, 'YYYY-MM-DD HH:mm:ss'),
                  ),
                )
                .format('HH:mm')}
            </td>
            <td style={{ textAlign: 'center' }}>
              <Moment format="DD/MM/YYYY HH:mm:ss">{item.login}</Moment>
            </td>
            <td style={{ textAlign: 'center' }}>
              <Moment format="DD/MM/YYYY HH:mm:ss">{item.logout}</Moment>
            </td>
            <td style={{ textAlign: 'center' }}>
              <button
                onClick={() =>
                  props.history.push(`/blockdata/${item.timestamp}`)
                }
                type="button"
                className="btn btn-info"
              >
                ข้อมูลบล็อก
              </button>
            </td>
          </tr>
        ))
      )
    } catch (error) {
      alert(error)
    }
  }

  const onChange = (e) => {
    e.persist()
    this.debounceSearch(e)
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">บันทึกการใช้งาน API</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <div>Blockchain</div>
                </li>
                <li className="breadcrumb-item active">ประวัติการเข้าใช้งาน</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}

      <SystemBar />

      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <table
                id="logchain_table"
                className="table table-bordered table-striped table-hover"
                style={{ height: 300, maxHeight: 300 }}
              >
                <thead>
                  <tr>
                    <th style={{ width: '10%', textAlign: 'center' }}>
                      วันที่
                    </th>
                    <th style={{ width: '10%', textAlign: 'center' }}>
                      ผู้ใช้
                    </th>
                    <th style={{ width: '15%', textAlign: 'center' }}>
                      Action
                    </th>
                    <th style={{ width: '10%', textAlign: 'center' }}>API</th>
                    <th style={{ width: '10%', textAlign: 'center' }}>
                      การใช้งาน (ชม.)
                    </th>
                    <th style={{ width: '10%', textAlign: 'center' }}>
                      เวลาเข้า
                    </th>
                    <th style={{ width: '10%', textAlign: 'center' }}>
                      เวลาออก
                    </th>
                    <th style={{ width: '14%', textAlign: 'center' }}>
                      บล็อกเชน
                    </th>
                  </tr>
                </thead>
                <tbody>{CreateRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
  )
}

export default withRouter(Logchain)
