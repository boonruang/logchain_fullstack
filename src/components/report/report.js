import React, { useState } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { chartData, chartOption } from '../../mockdata/chart_data'
import { withRouter } from 'react-router-dom'
import SystemBar from '../systembar'

const Report = () => {
  const [chart, setChart] = useState({
    chartType: 'bar',
  })

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
      <SystemBar />
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
