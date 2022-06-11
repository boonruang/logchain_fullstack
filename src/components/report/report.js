import React, { useState, useEffect } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { chartData, chartOption } from '../../mockdata/chart_data'
import { withRouter } from 'react-router-dom'
import SystemBar from '../systembar'

const Report = () => {
  useEffect(() => {
    setTimeout(() => {
      callJQuery()
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callJQuery = () => {
    const script = document.createElement('script')
    script.src = `js/report_page.js`
    script.async = true
    document.body.appendChild(script)
  }

  const [chart, setChart] = useState({
    chartType: 'bar',
  })

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>วิเคราะห์ข้อมูลและรายงาน</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <div>System</div>
                </li>

                <li className="breadcrumb-item active">
                  วิเคราะห์ข้อมูลและรายงาน
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              {/* AREA CHART */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Area Chart</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart">
                    <canvas
                      id="areaChart"
                      style={{
                        minHeight: 250,
                        height: 250,
                        maxHeight: 250,
                        maxWidth: '100%',
                      }}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* DONUT CHART */}
              <div className="card card-danger">
                <div className="card-header">
                  <h3 className="card-title">Donut Chart</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <canvas
                    id="donutChart"
                    style={{
                      minHeight: 250,
                      height: 250,
                      maxHeight: 250,
                      maxWidth: '100%',
                    }}
                  />
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* PIE CHART */}
              <div className="card card-danger">
                <div className="card-header">
                  <h3 className="card-title">Pie Chart</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <canvas
                    id="pieChart"
                    style={{
                      minHeight: 250,
                      height: 250,
                      maxHeight: 250,
                      maxWidth: '100%',
                    }}
                  />
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col (LEFT) */}
            <div className="col-md-6">
              {/* LINE CHART */}
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">User Line Chart</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart">
                    <canvas
                      id="lineChart"
                      style={{
                        minHeight: 250,
                        height: 250,
                        maxHeight: 250,
                        maxWidth: '100%',
                      }}
                    />
                    {/* <Line
                      data={chartData}
                      width={100}
                      height={250}
                      options={chartOption}
                    /> */}
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* BAR CHART */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">Bar Chart</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart">
                    <canvas
                      id="barChart"
                      style={{
                        minHeight: 250,
                        height: 250,
                        maxHeight: 250,
                        maxWidth: '100%',
                      }}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* STACKED BAR CHART */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">Stacked Bar Chart</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart">
                    <canvas
                      id="stackedBarChart"
                      style={{
                        minHeight: 250,
                        height: 250,
                        maxHeight: 250,
                        maxWidth: '100%',
                      }}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col (RIGHT) */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  )
}

export default withRouter(Report)
