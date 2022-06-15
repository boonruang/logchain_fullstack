import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../../actions/user.action'
import { withRouter } from 'react-router-dom'

const Userbar = (props) => {
  useEffect(() => {
    callActions()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callActions = () => {
    dispatch(userActions.getUserInfo())
  }

  const loginReducer = useSelector(({ loginReducer }) => loginReducer)
  const userReducer = useSelector(({ userReducer }) => userReducer)

  const dispatch = useDispatch()
  const { userResult } = userReducer
  const { result } = loginReducer

  return (
    <section className="content">
      <div className="container-fluid" style={{ padding: 0 }}>
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h4>{result ? result.username : null}</h4>
                <p>ผู้ใช้ปัจจุบัน</p>
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
                <h4>{userResult ? userResult.all_user : null}</h4>
                <p>ผู้ใช้ทั้งหมด</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h4>{userResult ? userResult.active_user : null}</h4>
                <p>พร้อมใช้ (Active)</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
            </div>
          </div>
          {/* ./col */}

          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h4>{userResult ? userResult.inactive_user : null}</h4>
                <p>ไม่พร้อมใช้ (Inactive)</p>
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
export default withRouter(Userbar)
