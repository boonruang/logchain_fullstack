import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const Report2 = () => {
  useEffect(() => {
    getSystemInfo()
    callJQuery()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callJQuery = () => {
    const script = document.createElement('script')
    script.src = `/js/report2_page.js`
    script.async = true
    document.body.appendChild(script)
  }

  const [cpuShow, setcpuShow] = useState()
  const [memShow, setmemShow] = useState()
  const [diskfreeShow, setdiskfreeShow] = useState()
  const [disktotalShow, setdisktotalShow] = useState()
  const [diskusedShow, setdiskusedShow] = useState()

  const getSystemInfo = (e) => {
    axios.get(`http://localhost:3001/api/v2/system/os`).then((res) => {
      let cpuData = res.data.cpuInfo
      let memData = res.data.memInfo
      let diskFree = res.data.diskFree
      let diskTotal = res.data.diskTotal
      let diskUsed = res.data.diskUsed

      setcpuShow(cpuData)
      setmemShow(memData)
      setdiskfreeShow(diskFree)
      setdisktotalShow(diskTotal)
      setdiskusedShow(diskUsed)
    })
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>ทรัพยากรระบบ</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <div>System</div>
                </li>

                <li className="breadcrumb-item active">ทรัพยากรระบบ</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* /.row */}
          <div className="row">
            <div className="col-md-6">
              {/* LINE CHART */}
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">หน่วยประมวลผล (CPU)</h3>
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
                {/* /.card-header */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          cpuShow
                            ? Math.round(cpuShow.totalIdle / 100000000)
                            : null
                        }
                        data-min={-150}
                        data-max={150}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#3c8dbc"
                      />
                      <div className="knob-label">CPU Idle (%)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          cpuShow
                            ? Math.round(cpuShow.totalTick / 100000000)
                            : null
                        }
                        data-min={-150}
                        data-max={150}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#f56954"
                      />
                      <div className="knob-label">Total Tick (%)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          cpuShow
                            ? Math.round(cpuShow.avgIdle / 10000000)
                            : null
                        }
                        data-min={-150}
                        data-max={150}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00a65a"
                      />
                      <div className="knob-label">CPU Average Idle (%)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          cpuShow
                            ? Math.round(cpuShow.avgTotal / 10000000)
                            : null
                        }
                        data-min={-150}
                        data-max={150}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00c0ef"
                      />
                      <div className="knob-label">CPU Average Total (%)</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}

                  {/* /.row */}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* LINE CHART */}
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">พื้นที่จัดเก็บ (Disk)</h3>
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
                {/* /.card-header */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          diskfreeShow ? Math.round(diskfreeShow) : null
                        }
                        data-min={0}
                        data-max={
                          disktotalShow ? Math.round(disktotalShow) : null
                        }
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#3c8dbc"
                      />
                      <div className="knob-label">พื้นที่ว่าง (GB)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          disktotalShow ? Math.round(disktotalShow) : null
                        }
                        data-min={0}
                        data-max={
                          disktotalShow ? Math.round(disktotalShow) : null
                        }
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00a65a"
                      />
                      <div className="knob-label">พื้นที่รวม (GB)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          diskusedShow ? Math.round(diskusedShow) : null
                        }
                        data-min={0}
                        data-max={
                          disktotalShow ? Math.round(disktotalShow) : null
                        }
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00c0ef"
                      />
                      <div className="knob-label">พื้นที่ใช้ (GB)</div>
                    </div>

                    {/* ./col */}
                  </div>
                  {/* /.row */}

                  {/* /.row */}
                </div>
                {/* /.card-body */}
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col (LEFT) */}
            <div className="col-md-6">
              {/* PIE CHART */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">หน่วยความจำ (Memory)</h3>
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
                {/* /.card-header */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          memShow ? Math.round(memShow.usedMemMb / 1000) : null
                        }
                        data-min={-150}
                        data-max={150}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#3c8dbc"
                      />
                      <div className="knob-label">หน่วยความจำที่ใช้ (GB)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          memShow ? Math.round(memShow.freeMemMb / 1000) : null
                        }
                        data-min={-150}
                        data-max={150}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00a65a"
                      />
                      <div className="knob-label">หน่วยความจำที่ว่าง (GB)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          memShow ? Math.round(memShow.usedMemPercentage) : null
                        }
                        data-min={-150}
                        data-max={150}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00c0ef"
                      />
                      <div className="knob-label">หน่วยความจำใช้ (%)</div>
                    </div>
                    {/* ./col */}
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          memShow ? Math.round(memShow.freeMemPercentage) : null
                        }
                        data-min={-150}
                        data-max={150}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#39CCCC"
                      />
                      <div className="knob-label">หน่วยความจำว่าง (%)</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}

                  {/* /.row */}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col (RIGHT) */}
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      {/* /.content */}
    </div>
  )
}

export default withRouter(Report2)
