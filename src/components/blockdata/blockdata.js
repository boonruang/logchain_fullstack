import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as blockDataActions from '../../actions/block.data.action'

const Blockdata = (props) => {
  useEffect(() => {
    let id = props.match.params.blockid
    dispatch(blockDataActions.getBlockById(id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const blockDataReducer = useSelector(
    ({ blockDataReducer }) => blockDataReducer,
  )
  const dispatch = useDispatch()

  const { result, isFetching } = blockDataReducer

  const mouseClick = () => {}

  return (
    <div class="content-wrapper">
      <div className="content-header">{/* /.container-fluid */}</div>
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <div className="card card-widget widget-user-2 shadow-sm">
                <div className="widget-user-header bg-info">
                  <div className="widget-user-image">
                    <img
                      className="img-circle elevation-2"
                      src="/dist/img/user7-128x128.jpg"
                      alt="User Avatar"
                    />
                  </div>
                  <h3 className="widget-user-username">BLOCK</h3>
                  {/* <h5 className="widget-user-desc">
                      Blockchain {result ? result.timestamp : null}
                    </h5> */}
                </div>
                <>
                  <div className="card-footer p-0">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <div className="nav-link">
                          Time
                          <span className="float-right badge bg-primary">
                            {result ? result.timestamp : null}
                          </span>
                        </div>
                      </li>
                      <li className="nav-item">
                        <div className="nav-link">
                          Hash
                          <span className="float-right badge bg-primary">
                            {result ? result.hash : null}
                          </span>
                        </div>
                      </li>
                      <li className="nav-item">
                        <div className="nav-link">
                          Last Hash
                          <span className="float-right badge bg-primary">
                            {result ? result.lasthash : null}
                          </span>
                        </div>
                      </li>
                      <li className="nav-item">
                        <div className="card card-success">
                          <div className="card-header">
                            <h3 className="card-title">User data</h3>
                          </div>
                          <div className="card-body">
                            <div className="nav-link">
                              User
                              <span className="float-right badge bg-info">
                                {result ? result.user : null}
                              </span>
                            </div>
                            <div className="nav-link">
                              Action
                              <span className="float-right badge bg-info">
                                {result ? result.action : null}
                              </span>
                            </div>
                            <div className="nav-link">
                              API
                              <span className="float-right badge bg-info">
                                {result ? result.api : null}
                              </span>
                            </div>
                            <div className="nav-link">
                              Log in
                              <span className="float-right badge bg-info">
                                {result ? result.login : null}
                              </span>
                            </div>
                            <div className="nav-link">
                              Log Out
                              <span className="float-right badge bg-info">
                                {result ? result.logout : null}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
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
          </div>
        </div>
      </section>
    </div>
  )
}

export default withRouter(Blockdata)
