import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as blockDataActions from '../../actions/block.data.action'
import SystemBar from '../systembar'

const Blockdata = (props) => {
  useEffect(() => {
    let id = parseInt(props.match.params.blockid)
    dispatch(blockDataActions.getBlockById(id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const blockDataReducer = useSelector(
    ({ blockDataReducer }) => blockDataReducer,
  )
  const dispatch = useDispatch()

  const { result, isFetching } = blockDataReducer

  const mouseClick = () => {}

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ห่วงโซ่บล็อก</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <div>Blockchain</div>
                </li>
                <li className="breadcrumb-item active">ห่วงโซ่บล็อก</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}

      <SystemBar />
      <section className="content-header ">
        <div className="col-sm-12" style={{ maxWidth: '80%' }}>
          <div
            className="card card-widget widget-user-2 shadow-sm"
            style={{ margin: 30 }}
          >
            <div className="bg-info">
              <h3 className="widget-user-username">ส่วนหัวห่วงโซ่บล็อก</h3>
            </div>
            <div className="card-footer p-0">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <div className="nav-link">
                    เวลา (Timestamp)
                    <span className="float-right">
                      {result ? result.timestamp : null}
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    ค่า Hash
                    <span className="float-right">
                      {result ? result.hash : null}
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    ค่า LastHash
                    <span className="float-right">
                      {result ? result.lasthash : null}
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    ค่า Nonce
                    <span className="float-right">
                      {result ? result.nonce : null}
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    ค่า Difficulty
                    <span className="float-right">
                      {result ? result.difficulty : null}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card widget-user-2" style={{ margin: 30 }}>
            <div className="bg-success">
              <h3 className="widget-user-username">ส่วนข้อมูล</h3>
            </div>
            <div className="card-footer p-0">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <div className="nav-link">
                    ผู้ใช้
                    <span className="float-right">
                      {result ? result.user : null}
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    ประเภทดำเนินการ
                    <span className="float-right">
                      {result ? result.action : null}
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    การดำเนินการ
                    <span className="float-right">
                      {result ? result.actionvalue : null}
                    </span>
                  </div>
                </li>
                {/* <li className="nav-item">
                  <div className="nav-link">
                    API
                    <span className="float-right">
                      {result ? result.api : null}
                    </span>
                  </div>
                </li> */}
                <li className="nav-item">
                  <div className="nav-link">
                    วันที่
                    <span className="float-right">
                      {result ? result.actiondate : null}
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    เวลา
                    <span className="float-right">
                      {result ? result.actiontime : null}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="box-footer" style={{ marginTop: 50 }}>
            <button
              type="submit"
              className="btn btn-primary pull-right"
              onClick={() => {
                // const script = document.createElement('script')
                // script.src = `js/destroytable.js`
                // script.async = true

                // this.props.history.push('/blockview')
                // this.props.getBlocks()

                props.history.goBack()
              }}
            >
              กลับ
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default withRouter(Blockdata)
