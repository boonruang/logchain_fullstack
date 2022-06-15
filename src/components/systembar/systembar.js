import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as systemActions from '../../actions/system.action'
import { withRouter } from 'react-router-dom'

const Systembar = (props) => {
  useEffect(() => {
    callActions()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callActions = () => {
    dispatch(systemActions.getSystems())
  }

  const systemReducer = useSelector(({ systemReducer }) => systemReducer)
  const dispatch = useDispatch()
  const { sysResult } = systemReducer

  return (
    <section className="content">
      <div className="container-fluid" style={{ padding: 0 }}>
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h4>{sysResult ? sysResult.blockCount : null}</h4>
                <p>จำนวนบล็อก</p>
              </div>
              <div className="icon">
                <i className="ion ion-android-cloud-circle" />
              </div>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h4>{sysResult ? sysResult.nodes : null}</h4>
                <p>จำนวนโหนด</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h4>{sysResult ? sysResult.active : null}</h4>
                <p>จำนวนโหนดที่ใช้งาน</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
            </div>
          </div>
          {/* ./col */}

          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h4>{sysResult ? sysResult.users : null}</h4>
                <p>จำนวนผู้ใช้</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
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
