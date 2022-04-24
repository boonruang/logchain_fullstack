import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as blockActions from '../../actions/block.action'
import * as systemActions from '../../actions/system.action'

import _ from 'lodash'
import Moment from 'react-moment'
import './blockview'
import { withRouter } from 'react-router-dom'

const Blockview = (props) => {
  useEffect(() => {
    callActions()

    setTimeout(() => {
      callJQuery()
    }, 100)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callActions = () => {
    dispatch(blockActions.getBlocks())
    dispatch(blockActions.getBlockCount())
    dispatch(systemActions.getSystems())
  }

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
        result !== null &&
        result.map((item) => (
          <tr key={item.timestamp}>
            <td style={{ textAlign: 'center' }}>{item.timestamp}</td>
            <td style={{ textAlign: 'center' }}>
              <Moment format="DD/MM/YYYY">{item.login}</Moment>
            </td>
            <td>{item.hash}</td>
            <td>{item.lasthash}</td>
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
              <h1 className="m-0">การแสดงผล BLOCKCHAIN</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <div>Log</div>
                </li>
                <li className="breadcrumb-item active">Blockchain</li>
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
                id="blockview_table"
                className="table table-bordered table-striped table-hover"
                style={{ height: 300, maxHeight: 300 }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '5%',
                        textAlign: 'center',
                      }}
                    >
                      ลำดับ
                    </th>
                    <th style={{ width: '10%', textAlign: 'center' }}>เวลา</th>
                    <th style={{ width: '20%', textAlign: 'center' }}>Hash</th>
                    <th style={{ width: '20%', textAlign: 'center' }}>
                      LastHash
                    </th>
                    <th style={{ width: '15%', textAlign: 'center' }}>
                      Transaction
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

// const mapStateToProps = ({ blockReducer }) => ({ blockReducer })

// const mapDispatchToProps = {
//   ...actions,
// }

export default withRouter(Blockview)
