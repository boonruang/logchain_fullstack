import React, { useState, useEffect } from 'react'
import './userEdit.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'
import { withRouter } from 'react-router-dom'
import * as userEditActions from '../../actions/user.edit.action'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import UserBar from '../userbar'

const MySwal = withReactContent(Swal)

const UserEdit = (props) => {
  useEffect(() => {
    let id = parseInt(props.match.params.id)
    dispatch(userEditActions.getUserById(id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const userEditReducer = useSelector(({ userEditReducer }) => userEditReducer)
  const dispatch = useDispatch()

  const { result, isFetching } = userEditReducer

  const showForm = ({
    errors,
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    handleBlur,
  }) => {
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="firstname">
            ชื่อ
          </label>
          <div className="col-sm-10">
            <input
              name="firstname"
              onChange={handleChange}
              value={values.firstname}
              className="form-control"
              type="text"
              id="firstname"
              onBlur={handleBlur}
            />
            {errors.firstname ? <div>{errors.firstname}</div> : null}
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="lastname">
            นามสกุล
          </label>
          <div className="col-sm-10">
            <input
              name="lastname"
              onChange={handleChange}
              value={values.lastname}
              className="form-control"
              type="text"
              id="lastname"
              onBlur={handleBlur}
            />
            {errors.lastname ? <div>{errors.lastname}</div> : null}
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="username">
            ชื่อ (Login)
          </label>
          <div className="col-sm-10">
            <input
              name="username"
              onChange={handleChange}
              value={values.username}
              className="form-control"
              type="text"
              id="username"
            />
            {errors.username ? <div>{errors.username}</div> : null}
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="password">
            รหัสผ่าน
          </label>
          <div className="col-sm-10">
            <input
              name="password"
              onChange={handleChange}
              // value={values.password}
              value={values.password}
              className="form-control"
              type="password"
              id="password"
            />
            {errors.password ? <div>{errors.password}</div> : null}
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="password2">
            ยืนยันรหัสผ่าน
          </label>
          <div className="col-sm-10">
            <input
              name="password2"
              onChange={handleChange}
              value={values.password2}
              className="form-control"
              type="password"
              id="password2"
            />
            {errors.password2 ? <div>{errors.password2}</div> : null}
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="status">
            สถานะ
          </label>
          <div className="col-sm-10">
            <select
              name="status"
              onChange={handleChange}
              value={values.status}
              className="custom-select"
              id="status"
            >
              <option value="false">Inactive</option>
              <option value="true">Active</option>
            </select>
            {errors.status ? <div>{errors.status}</div> : null}
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="roleId">
            ระดับสิทธิ์
          </label>
          <div className="col-sm-10">
            <select
              name="roleId"
              onChange={handleChange}
              value={values.roleId}
              className="custom-select"
              id="roleId"
            >
              <option value="1">Admin</option>
              <option value="2">User</option>
              <option value="3">API</option>
            </select>
            {errors.roleId ? <div>{errors.roleId}</div> : null}
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            // disabled={isSubmitting}
            className="btn btn-primary pull-right"
            style={{ marginRight: 20 }}
            disabled={!dirty}
          >
            ปรับข้อมูล
          </button>
          <a
            onClick={() => {
              props.history.goBack()
            }}
            type="Button"
            className="btn btn-default pull-right"
          >
            ยกเลิก
          </a>
        </div>
      </form>
    )
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">แก้ไขผู้ใช้</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <div>System</div>
                </li>
                <li className="breadcrumb-item active">แก้ไขผู้ใช้</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}

      <UserBar />
      <section className="content" style={{ maxWidth: '80%' }}>
        <div
          className="box box-primary"
          style={{ marginLeft: 3, marginTop: 50 }}
        >
          <div className="card">
            <div
              className="box-body"
              style={{
                marginTop: 30,
                marginLeft: 30,
                marginBottom: 50,
              }}
            >
              <Formik
                validate={(values) => {
                  let errors = {}
                  if (!values.firstname) {
                    errors.firstname = 'โปรดระบุ'
                  } else if (values.firstname.length <= 4) {
                    errors.firstname = 'จำนวนตัวอักษรต้องมากกว่า 4'
                  }
                  if (!values.lastname) {
                    errors.lastname = 'โปรดระบุ'
                  } else if (values.lastname.length <= 4) {
                    errors.lastname = 'จำนวนตัวอักษรต้องมากกว่า 4'
                  }
                  if (!values.username) {
                    errors.username = 'โปรดระบุ'
                  } else if (values.username.length <= 4) {
                    errors.username = 'ต้องมากกว่า 4'
                  }

                  if (values.password != '' && values.password.length < 8) {
                    errors.password = 'จำนวนตัวอักษรต้องมากกว่า 8'
                  }

                  if (values.password2 != '' && values.password2.length < 8) {
                    errors.password2 = 'จำนวนตัวอักษรต้องมากกว่า 8'
                  }

                  if (values.password != values.password2) {
                    errors.password2 = 'รหัสผ่านไม่ตรงกัน'
                  }
                  if (!values.status) errors.status = 'โปรดระบุ'
                  if (!values.roleId) errors.roleId = 'โปรดระบุ'
                  return errors
                }}
                enableReinitialize
                initialValues={result ? result : {}}
                onSubmit={async (values, { setSubmitting }) => {
                  let formData = new FormData()
                  formData.append('id', values.id)
                  formData.append('username', values.username)
                  formData.append('password', values.password)
                  formData.append('firstname', values.firstname)
                  formData.append('lastname', values.lastname)
                  formData.append('status', values.status)
                  formData.append('roleId', values.roleId)

                  dispatch(userEditActions.updateUser(props.history, formData))

                  // หากไม่มีการแก้ไขข้อมูลอะไรเลย ไม่ต้องทำอะไร ไม่ต้องอัพเดท
                  // ยังไม่มีวิธีเช็คฟิลด์อื่นเลย

                  // alert(JSON.stringify(values, null, 3))
                  // if (values.password === values.password2) {
                  //   dispatch(
                  //     userEditActions.updateUser(props.history, formData),
                  //   )
                  //   setSubmitting(false)

                  // props.history.goBack()

                  // Display the key/value pairs
                  // for (var pair of formData.entries()) {
                  //   console.log('formData pair: ', pair[0] + ', ' + pair[1])
                  // }

                  // alert(JSON.stringify(values, null, 3))
                  // setTimeout(() => {
                  //   console.log('FormData(): ', formData)
                  //   setSubmitting(false)
                  // }, 1000)
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 3))
                  //   setSubmitting(false)
                  // }, 400)
                }}
              >
                {(props) => showForm(props)}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default withRouter(UserEdit)
