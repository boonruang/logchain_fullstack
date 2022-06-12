import React, { useState, useEffect } from 'react'
import { Line, Bar, Pie, Doughnut, Radar, Bubble } from 'react-chartjs-2'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const Report2 = () => {
  const [graph, setGraph] = useState([])

  const [getdata, setGetData] = useState([])

  const userDetail = async () => {
    axios
      .get('http://localhost:3001/api/v2/blockchain/form/8/2022')

      .then((response) => {
        setGetData(response.data.blockchainList)
        // alert(JSON.stringify(response.data.blockchainList, null, 2))
      })
  }

  useEffect(() => {
    userDetail()
  }, [])

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
            <div className="container">
              <h4 className="text-center text-primary mt-2 mb-3">
                กราฟดึงข้อมูลด้วย ReactJS
              </h4>
              <h6 className="text-center text-success mt-2 mb-3">
                ผู้ใช้งานและจำนวนครั้งการเข้าใช้งาน API
              </h6>
              <div className="row mt-3">
                <div className="col-sm-3">
                  <div className="">
                    <table class=" table-bordered graphTable ">
                      <tr>
                        <th>ผู้ใช้</th>
                        <th>จำนวน</th>
                      </tr>
                      {getdata.map((name) => (
                        <tr>
                          <td>{name.user}</td>
                          <td>{name.total_user}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
                <div className="col-sm-9">
                  <Bar
                    data={graph}
                    options={{
                      title: {
                        display: true,
                        text: 'จำนวนการเข้าใช้ API',
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: 'right',
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
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  )
}

export default withRouter(Report2)
