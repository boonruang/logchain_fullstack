import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as blockActions from '../../actions/block.action'

import _ from 'lodash'
import Moment from 'react-moment'
import './blockview'
import { withRouter } from 'react-router-dom'
import Systembar from '../systembar'

const Blockview = (props) => {
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
    script.src = `/js/content.js`
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
              <h1 className="m-0">แสดงผลห่วงโซ่บล็อก</h1>
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
      {/* Main content */}

      <Systembar />

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
                      Timestamp
                    </th>
                    <th style={{ width: '12%', textAlign: 'center' }}>
                      Timestamp (Date)
                    </th>
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
