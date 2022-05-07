import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Systembar from '../systembar'

const Dashboard = (props) => {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">แดสบอร์ด</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/blockview">Blockview</Link>
                </li>
                <li className="breadcrumb-item active">แดสบอร์ด</li>
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
      {/* /.content */}
    </div>
  )
}

export default withRouter(Dashboard)
