import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const Report2 = () => {
  useEffect(() => {
    callJQuery()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callJQuery = () => {
    const script = document.createElement('script')
    script.src = `/js/report2_page.js`
    script.async = true
    document.body.appendChild(script)
  }

  const systemProp = {
    user: 25,
    bandwidth: 20,
    boundrate: 65,
    serverload: 25,
    cpuload: 30,
    diskspace: 30,
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
          {/* row */}
          <div className="row">
            <div className="col-12">
              {/* jQuery Knob */}
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="far fa-chart-bar" />
                    ทรัพยากรห่วงโซ่บล็อก
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
                {/* /.card-header */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={systemProp.user}
                        data-width={90}
                        data-height={90}
                        data-fgcolor="#3c8dbc"
                      />
                      <div className="knob-label">User</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={systemProp.boundrate}
                        data-width={90}
                        data-height={90}
                        data-fgcolor="#f56954"
                      />
                      <div className="knob-label">Bounce Rate</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={systemProp.serverload}
                        data-min={-150}
                        data-max={150}
                        data-width={90}
                        data-height={90}
                        data-fgcolor="#00a65a"
                      />
                      <div className="knob-label">Server Load</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 col-md-3 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={systemProp.diskspace}
                        data-width={90}
                        data-height={90}
                        data-fgcolor="#00c0ef"
                      />
                      <div className="knob-label">Disk Space</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}
                  <div className="row">
                    <div className="col-6 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={systemProp.bandwidth}
                        data-width={90}
                        data-height={90}
                        data-fgcolor="#932ab6"
                      />
                      <div className="knob-label">Bandwidth</div>
                    </div>
                    {/* ./col */}
                    <div className="col-6 text-center">
                      <input
                        type="text"
                        className="knob"
                        defaultValue={systemProp.cpuload}
                        data-width={90}
                        data-height={90}
                        data-fgcolor="#39CCCC"
                      />
                      <div className="knob-label">CPU</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
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
