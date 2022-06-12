import React, { useState, useEffect } from 'react'
import { Line, Bar, Pie, Doughnut, Radar, Bubble } from 'react-chartjs-2'
import {
  chartData,
  chartOption,
  donutData,
  donutOption,
  stackedBarChartData,
  stackedBarChartOptions,
  pieOption,
} from '../../mockdata/chart_data'
import { withRouter } from 'react-router-dom'
import SystemBar from '../systembar'

const Report = () => {
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
              {/* LINE CHART */}
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">
                    กรอกแบบฟอร์มรง.8 เทียบปี 2564 และ 2565
                  </h3>
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
                    <Line
                      data={chartData}
                      width={100}
                      height={250}
                      options={chartOption}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* BAR CHART */}
              <div className="card card-danger">
                <div className="card-header">
                  <h3 className="card-title">
                    กรอกแบบฟอร์มรง.8 เทียบปี 2564 และ 2565
                  </h3>
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
                  <Bar
                    data={chartData}
                    width={100}
                    height={250}
                    options={chartOption}
                  />
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* DOUGHNUT CHART */}
              <div className="card card-warning">
                <div className="card-header">
                  <h3 className="card-title">
                    กรอกแบบฟอร์มรง.8 เทียบปี 2564 และ 2565
                  </h3>
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
                  <Doughnut
                    data={donutData}
                    minHeight={250}
                    height={250}
                    maxHeight={250}
                    maxWidth={100}
                    options={donutOption}
                  />
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col (LEFT) */}
            <div className="col-md-6">
              {/* PIE CHART */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">
                    กรอกแบบฟอร์มรง.8 เทียบปี 2564 และ 2565
                  </h3>
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
                    <Pie
                      data={donutData}
                      width={100}
                      height={250}
                      options={pieOption}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* RADAR CHART */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">
                    กรอกแบบฟอร์มรง.8 เทียบปี 2564 และ 2565
                  </h3>
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
                    <Radar
                      data={chartData}
                      width={100}
                      height={250}
                      options={chartOption}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* LINE2 CHART */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">
                    กรอกแบบฟอร์มรง.8 เทียบปี 2564 และ 2565 (Stacked)
                  </h3>
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
                    <Bar
                      data={chartData}
                      width={100}
                      height={250}
                      options={stackedBarChartOptions}
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
