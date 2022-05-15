import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as blockActions from '../../actions/block.action'
import * as systemActions from '../../actions/system.action'
import * as systemNodeActions from '../../actions/system.node.action'
import { withRouter } from 'react-router-dom'
import net from 'net'
import axios from 'axios'

const Systembar = (props) => {
  useEffect(() => {
    callActions()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callActions = () => {
    dispatch(blockActions.getBlockCount())
    dispatch(systemActions.getSystems())
    dispatch(systemNodeActions.getNodes())
  }

  const blockReducer = useSelector(({ blockReducer }) => blockReducer)
  const systemReducer = useSelector(({ systemReducer }) => systemReducer)
  const systemNodeReducer = useSelector(
    ({ systemNodeReducer }) => systemNodeReducer,
  )
  const dispatch = useDispatch()
  const { count } = blockReducer
  const { sysResult } = systemReducer
  const { result, isFetching } = systemNodeReducer

  return (
    <section className="content">
      <div className="container-fluid">
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-4 col-6">
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
          <div className="col-lg-4 col-6">
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

          <div className="col-lg-4 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{sysResult ? sysResult.users : null}</h3>
                <p>จำนวนผู้ใช้</p>
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
  )
}
export default withRouter(Systembar)
