import React, { useEffect, useState } from 'react'
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
import axios from 'axios'

const Report = () => {
  const [graph, setGraph] = useState([])

  const selectChart = (e) => {
    axios
      .get(`http://localhost:3001/api/v2/blockchain/form/8/2022`)
      .then((res) => {
        const userData = res.data.blockchainList
        let user = []
        let total_user = []
        userData.forEach((item) => {
          user.push(item.user)
          total_user.push(item.total_user)
        })
        setGraph({
          labels: user,
          datasets: [
            {
              label: 'จำนวนการเข้าใช้งาน',
              fill: false,
              backgroundColor: [
                'green',
                'red',
                'blue',
                '#FFBF00',
                '#DE3163',
                'orange',
                '#40E0D0',
                '#6495ED',
                '#CCCCFF',
                '#FFBF00',
                '#DE3163',
                '#9FE2BF',
                '#CD5C5C',
              ],
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 0,
              data: total_user,
            },
          ],
        })
      })
  }
  useEffect(() => {
    selectChart()
  }, [])

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
                    การเข้าใช้ API แบบฟอร์ม รง.8 ปี 2564
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
                      data={graph}
                      width={100}
                      height={250}
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        title: {
                          display: true,
                          text: 'จำนวนการเข้าใช้ API',
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: 'top',
                        },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                precision: 0,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* DOUGHNUT CHART */}
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">
                    การเข้าใช้ API แบบฟอร์ม รง.8 ปี 2564
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
                    data={graph}
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
                    การเข้าใช้ API แบบฟอร์ม รง.8 ปี 2564
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
                      data={graph}
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
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">
                    การเข้าใช้ API แบบฟอร์ม รง.8 ปี 2564
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
                      data={graph}
                      width={100}
                      height={250}
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        title: {
                          display: true,
                          text: 'จำนวนการเข้าใช้ API',
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: 'top',
                        },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                precision: 1,
                              },
                            },
                          ],
                        },
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
