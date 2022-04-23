import React, { Component } from 'react'
import * as actions from './../../actions/stock.action'
import { connect } from 'react-redux'

import { imageUrl } from './../../constants'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Moment from 'react-moment'
import NumberFormat from 'react-number-format'
import './stock.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class Stock extends Component {
  // dummyData = [
  //   { c1: '1', c2: 'xxx', c3: 'xxx', c4: 'xxx', c5: 'xxx' },
  //   { c1: '2', c2: 'xxx', c3: 'xxx', c4: 'xxx', c5: 'xxx' },
  //   { c1: '3', c2: 'xxx', c3: 'xxx', c4: 'xxx', c5: 'xxx' },
  //   { c1: '4', c2: 'xxx', c3: 'xxx', c4: 'xxx', c5: 'xxx' },
  //   { c1: '5', c2: 'xxx', c3: 'xxx', c4: 'xxx', c5: 'xxx' }
  // ];

  componentDidMount() {
    this.debounceSearch = _.debounce(this.props.getProductByKeyword, 500)
    this.props.getProducts()
  }

  createRows = () => {
    try {
      const { result, isFetching } = this.props.stockReducer
      return (
        !isFetching &&
        result != null &&
        result.map((item) => (
          <tr key={item.id}>
            <td>
              <Moment format="DD/MM/YYYY">{item.createdAt}</Moment>
            </td>
            <td>
              <span style={{ marginRight: 10, minHe: 100 }}>
                <img
                  src={`${imageUrl}/images/${
                    item.image
                  }?dummy=${Math.random()}`}
                  style={{ maxWidth: 50 }}
                />
              </span>
              {item.name}
            </td>
            <td>
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'฿'}
              />
            </td>
            <td>
              <NumberFormat
                value={item.stock}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={0}
                fixedDecimalScale={true}
                suffix={' pcs'}
              />
            </td>
            <td>{item.id}</td>
            <td style={{ textAlign: 'center' }}>
              <button
                onClick={() =>
                  this.props.history.push(`/stock-edit/${item.id}`)
                }
                type="button"
                className="btn btn-info"
              >
                รายละเอียด
              </button>
            </td>
          </tr>
        ))
      )
    } catch (error) {}
  }

  onChange = (e) => {
    // this.props.getProductByKeyword(e);
    e.persist()
    this.debounceSearch(e)
  }

  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">ประวัติการเข้าใช้งาน API</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Log</a>
                  </li>
                  <li className="breadcrumb-item active">
                    ประวัติการเข้าใช้งาน
                  </li>
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
                    <h3>3</h3>
                    <p>จำนวนโหนด</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-android-cloud-circle" />
                  </div>
                  <a href="#" className="small-box-footer">
                    รายละเอียด <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>
                      53<sup style={{ fontSize: 20 }}>%</sup>
                    </h3>
                    <p>% โหลด</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">
                    รายละเอียด <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>จำนวนการใช้งาน</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">
                    รายละเอียด <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>ผู้ใช้งาน</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">
                    รายละเอียด <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
            {/* Main row */}
            <div className="row" style={{ marginBottom: 40 }}>
              <div className="col-md-8">
                <input
                  onChange={this.onChange}
                  type="search"
                  className="form-control input-lg"
                  placeholder="ใส่ข้อความเพื่อค้นหา"
                  style={{ borderRadius: 10 }}
                />
              </div>
              <div className="col-md-4 text-right">
                <Link
                  to="/stock-create"
                  style={{ float: 'right', margin: 0, width: 100 }}
                  className="btn btn-success btn-lg"
                >
                  ค้นหา
                </Link>
              </div>

              <table
                id="stock_table"
                className="table table-bordered table-striped table-hover"
                style={{ height: 300, maxHeight: 300 }}
              >
                <thead>
                  <tr>
                    <th style={{ width: '10%', textAlign: 'center' }}>
                      วันที่
                    </th>
                    <th style={{ width: '35%' }}>ผู้ใช้งาน</th>
                    <th style={{ width: '10%' }}>จำนวนการใช้งาน</th>
                    <th style={{ width: '10%' }}>เวลาเข้า</th>
                    <th style={{ width: '10%' }}>เวลาออก</th>
                    <th style={{ width: '14%', textAlign: 'center' }}>
                      ข้อมูล
                    </th>
                  </tr>
                </thead>
                <tbody>{this.createRows()}</tbody>
              </table>
            </div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    )
  }
}

const mapStateToProps = ({ stockReducer }) => ({ stockReducer })

const mapDispatchToProps = {
  // spreading
  ...actions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
