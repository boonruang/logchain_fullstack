import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as systemActions from '../../actions/system.action'
import axios from 'axios'
import { round } from 'lodash'

const Report = () => {
  useEffect(() => {
    getSystemOS()
    callActions()
    setTimeout(() => {
      callJQuery()
    }, 1000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callActions = () => {
    dispatch(systemActions.getSystems())
  }

  const systemReducer = useSelector(({ systemReducer }) => systemReducer)
  const dispatch = useDispatch()
  const { sysResult } = systemReducer

  const callJQuery = () => {
    const script = document.createElement('script')
    script.src = `/js/report2_page.js`
    script.async = true
    document.body.appendChild(script)
  }

  const [cpuShow, setcpuShow] = useState()
  const [memShow, setmemShow] = useState()
  const [diskShow, setDiskShow] = useState()

  const getSystemOS = () => {
    axios.get(`http://61.19.101.249:3001/api/v2/system/os`).then((res) => {
      let cpuData = res.data.cpuInfo
      let memData = res.data.memInfo
      let diskData = res.data.diskInfo

      setcpuShow(cpuData)
      setmemShow(memData)
      setDiskShow(diskData)
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
                          diskShow
                            ? round(
                                (diskShow.size - diskShow.free) / 1000000000,
                              )
                            : null
                        }
                        data-min={1}
                        data-max={
                          diskShow ? round(diskShow.size / 1000000000) : null
                        }
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00c0ef"
                        data-readonly="true"
                      />
                      <div className="knob-label">พื้นที่ใช้ (GB)</div>
                    </div>
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          diskShow ? round(diskShow.free / 1000000000) : null
                        }
                        data-min={1}
                        data-max={
                          diskShow ? round(diskShow.size / 1000000000) : null
                        }
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00c0ef"
                        data-readonly="true"
                      />
                      <div className="knob-label">พื้นที่ว่าง (GB)</div>
                    </div>
                    {/* ./col */}
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          diskShow ? round(diskShow.size / 1000000000) : null
                        }
                        data-min={1}
                        data-max={
                          diskShow ? round(diskShow.size / 1000000000) : null
                        }
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00a65a"
                        data-readonly="true"
                      />
                      <div className="knob-label">พื้นที่รวม (GB)</div>
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
                            ? Number(cpuShow.totalIdle / 10000000000).toFixed(2)
                            : null
                        }
                        data-min={0}
                        data-max={1}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#3c8dbc"
                        data-readonly="true"
                      />
                      <div className="knob-label">Idle (GHz)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          cpuShow
                            ? Number(cpuShow.avgIdle / 10000000000).toFixed(2)
                            : null
                        }
                        data-min={0}
                        data-max={1}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00a65a"
                        data-readonly="true"
                      />
                      <div className="knob-label">Average Idle (GHz)</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={
                          cpuShow
                            ? Number(cpuShow.avgTotal / 10000000000).toFixed(2)
                            : null
                        }
                        data-min={0}
                        data-max={1}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00c0ef"
                        data-readonly="true"
                      />
                      <div className="knob-label">Average Total (GHz)</div>
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
            {/* /.col (LEFT) */}
            <div className="col-md-6">
              {/* MEMORY */}
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
                        data-readonly="true"
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
                        data-readonly="true"
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
                        data-readonly="true"
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
                        data-readonly="true"
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

              {/* NODE */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">โครงข่าย (Node)</h3>
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
                        defaultValue={sysResult ? sysResult.blockCount : null}
                        data-min={0}
                        data-max={1000}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#f56954"
                        data-readonly="true"
                      />
                      <div className="knob-label">จำนวนห่วงโซ่บล็อก</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={sysResult ? sysResult.nodes : null}
                        data-min={0}
                        data-max={3}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00c0ef"
                        data-readonly="true"
                      />
                      <div className="knob-label">จำนวนโครงข่ายโหนด</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={sysResult ? sysResult.active : null}
                        data-min={0}
                        data-max={3}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#00a65a"
                        data-readonly="true"
                      />
                      <div className="knob-label">โหนดที่ทำงานอยู่</div>
                    </div>
                    {/* ./col */}
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={sysResult ? sysResult.users : null}
                        data-min={0}
                        data-max={1000}
                        data-width={120}
                        data-height={120}
                        data-fgcolor="#932ab6"
                        data-readonly="true"
                      />
                      <div className="knob-label">จำนวนผู้ใช้ API</div>
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

export default Report
