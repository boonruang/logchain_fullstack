import React, { useEffect, useState } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { chartData, chartOption } from '../../mockdata/chart_data'
import * as blockActions from '../../actions/block.action'
import * as systemActions from '../../actions/system.action'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Report = () => {
  useEffect(() => {
    fetchList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchList = () => {
    dispatch(blockActions.getBlockCount())
    dispatch(systemActions.getSystems())
  }

  const [chart, setChart] = useState({
    chartType: 'bar',
  })

  const blockReducer = useSelector(({ blockReducer }) => blockReducer)
  const systemReducer = useSelector(({ systemReducer }) => systemReducer)
  const dispatch = useDispatch()

  const { count } = blockReducer
  const { sysResult } = systemReducer

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Report</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <div>Report</div>
                </li>
                <li className="breadcrumb-item active">Chart</li>
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
      <section className="content-header">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => setChart({ chartType: 'line' })}
          >
            Line
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setChart({ chartType: 'bar' })}
          >
            Bar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setChart({ chartType: 'pie' })}
          >
            Pie
          </button>
        </div>
        <div style={{ height: 500 }}>
          {chart.chartType === 'line' && (
            <Line
              data={chartData}
              width={100}
              height={50}
              options={chartOption}
            />
          )}
          {chart.chartType === 'pie' && (
            <Pie
              data={chartData}
              width={100}
              height={50}
              options={chartOption}
            />
          )}
          {chart.chartType === 'bar' && (
            <Bar
              data={chartData}
              width={100}
              height={50}
              options={chartOption}
            />
          )}
        </div>
      </section>
      {/* /.content */}
    </div>
  )
}

export default withRouter(Report)
