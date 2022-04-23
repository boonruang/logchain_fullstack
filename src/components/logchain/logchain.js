import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import Moment from 'react-moment'
import './logchain.css'
import moment from 'moment'
import * as blockActions from '../../actions/block.action'
import * as systemActions from '../../actions/system.action'
import { withRouter } from 'react-router-dom'

const Logchain = (props) => {
  useEffect(() => {
    callJQuery()

    dispatch(blockActions.getBlocks())
    dispatch(blockActions.getBlockCount())
    dispatch(systemActions.getSystems())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callJQuery = () => {
    const script = document.createElement('script')
    script.src = `js/content.js`
    script.async = true
    document.body.appendChild(script)
  }

  const blockReducer = useSelector(({ blockReducer }) => blockReducer)
  const systemReducer = useSelector(({ systemReducer }) => systemReducer)
  const dispatch = useDispatch()
  const { result, isFetching, count } = blockReducer
  const { sysResult } = systemReducer

  // const mouseClick = () => {}

  const CreateRows = () => {
    try {
      return (
        !isFetching &&
        result != null &&
        result.map((item) => (
          <tr key={item.timestamp}>
            <td style={{ textAlign: 'center' }}>
              <Moment format="DD/MM/YYYY HH:mm:ss">{item.login}</Moment>
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
                รายละเอียด
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
                  <div>Log</div>
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
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{count && count}</h3>
                  <p>จำนวนบล็อก</p>
                </div>
                <div className="icon">
                  <i className="ion ion-android-cloud-circle" />
                </div>
                <div className="small-box-footer">
                  รายละเอียด <i className="fas fa-arrow-circle-right" />
                </div>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{sysResult ? sysResult.nodes : null}</h3>
                  <p>จำนวนโหนด</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <div className="small-box-footer">
                  รายละเอียด <i className="fas fa-arrow-circle-right" />
                </div>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{sysResult ? sysResult.active : null}</h3>
                  <p>จำนวนโหนดที่ใช้งาน</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <div className="small-box-footer">
                  รายละเอียด <i className="fas fa-arrow-circle-right" />
                </div>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{sysResult ? sysResult.users : null}</h3>
                  <p>ผู้ใช้งาน</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <div className="small-box-footer">
                  รายละเอียด <i className="fas fa-arrow-circle-right" />
                </div>
              </div>
            </div>
            {/* ./col */}
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
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
