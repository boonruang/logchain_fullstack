import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Moment from 'react-moment'
import './user.css'
import * as userActions from '../../actions/user.action'
import { withRouter } from 'react-router-dom'
import UserBar from '../userbar'
import { imageUrl } from './../../constants'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const User = (props) => {
  useEffect(() => {
    callActions()

    setTimeout(() => {
      callJQuery()
    }, 500)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callActions = () => {
    dispatch(userActions.getUsers())
  }

  const callJQuery = () => {
    const script = document.createElement('script')
    script.src = `/js/content_user.js`
    script.async = true
    document.body.appendChild(script)
  }

  const userReducer = useSelector(({ userReducer }) => userReducer)
  const dispatch = useDispatch()
  const { result, isFetching } = userReducer

  // const mouseClick = () => {}

  const CreateRows = () => {
    try {
      return (
        !isFetching &&
        result != null &&
        result.map((item) => (
          <tr key={item.id}>
            <td style={{ textAlign: 'center' }}>{item.id}</td>
            <td style={{ textAlign: 'center' }}>{item.username}</td>
            <td style={{ textAlign: 'center' }}>
              {item.firstname} {item.lastname}
            </td>
            <td style={{ textAlign: 'center' }}>{item.role.name}</td>
            <td
              style={{ textAlign: 'center' }}
              className={item.status ? 'text-success' : 'text-danger'}
            >
              {item.status ? 'Active' : 'Inactive'}
            </td>
            <td style={{ textAlign: 'center' }}>
              <Moment format="DD/MM/YYYY HH:mm:ss">{item.createdAt}</Moment>
            </td>
            <td style={{ textAlign: 'center' }}>
              <Moment format="DD/MM/YYYY HH:mm:ss">{item.updatedAt}</Moment>
            </td>
            <td style={{ textAlign: 'center' }}>
              <button
                onClick={() => props.history.push(`/user-edit/${item.id}`)}
                type="button"
                className="btn btn-info"
              >
                แก้ไข
              </button>
              <span style={{ color: 'grey' }}> | </span>
              <button
                onClick={() => {
                  MySwal.fire({
                    title: 'กรุณายืนยันการลบข้อมูล',
                    text: 'กรุณาตอบยืนยันเพื่อเป็นการลบข้อมูล',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก',
                  }).then((result) => {
                    // alert(item.id)
                    if (result.value) {
                      dispatch(userActions.deleteUserById(item.id))
                    }
                  })
                }}
                type="button"
                className="btn btn-danger"
              >
                ลบ
              </button>
            </td>
          </tr>
        ))
      )
    } catch (error) {
      alert(error)
    }
  }

  const onChange = (e) => {
    e.persist()
    this.debounceSearch(e)
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">จัดการผู้ใช้งาน</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <div>System</div>
                </li>
                <li className="breadcrumb-item active">จัดการผู้ใช้งาน</li>
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

      <UserBar />

      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div
                className="col-xs-6 text-right"
                style={{ marginTop: 7, marginBottom: 7 }}
              >
                <Link
                  to="/user-create"
                  style={{ float: 'right', margin: 0, width: 100 }}
                  className="btn btn-success btn-lg"
                >
                  เพิ่ม
                </Link>
              </div>

              <table
                id="user_table"
                className="table table-bordered table-striped table-hover"
                style={{ height: 300, maxHeight: 300 }}
              >
                <thead>
                  <tr>
                    <th style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                    <th style={{ width: '7%', textAlign: 'center' }}>
                      ล็อกอิน
                    </th>
                    <th style={{ width: '15%', textAlign: 'center' }}>ชื่อ</th>
                    <th style={{ width: '10%', textAlign: 'center' }}>
                      ระดับสิทธิ์
                    </th>
                    <th style={{ width: '5%', textAlign: 'center' }}>สถานะ</th>
                    <th style={{ width: '10%', textAlign: 'center' }}>สร้าง</th>
                    <th style={{ width: '10%', textAlign: 'center' }}>แก้ไข</th>
                    <th style={{ width: '14%', textAlign: 'center' }}>
                      ดำเนินการ
                    </th>
                  </tr>
                </thead>
                <tbody>{CreateRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
  )
}

export default withRouter(User)
