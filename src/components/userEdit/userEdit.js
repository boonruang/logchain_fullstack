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

const MySwal = withReactContent(Swal)

const UserEdit = (props) => {
  useEffect(() => {
    let id = parseInt(props.match.params.id)
    dispatch(userEditActions.getUserById(id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const userEditReducer = useSelector(({ userEditReducer }) => userEditReducer)
  const dispatch = useDispatch()

  const { result, isFetching } = userEditReducer

  const showForm = ({ values, handleChange, handleSubmit, isSubmitting }) => {
    return (
      <Form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="firstname">
            ชื่อ
          </label>
          <div className="col-sm-10">
            <input
              name="firstname"
              onChange={handleChange}
              value={values.firstname}
              placeholder="โปรดระบุ"
              className="form-control"
              type="text"
              id="firstname"
            />
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
              placeholder="โปรดระบุ"
              className="form-control"
              type="text"
              id="lastname"
            />
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
              placeholder="โปรดระบุ"
              className="form-control"
              type="text"
              id="username"
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="password">
            รหัสผ่าน
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="password"
                onChange={handleChange}
                value="12345678"
                className="form-control"
                type="password"
                id="password"
              />
            </div>
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="password2">
            ยืนยันรหัสผ่าน
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="password2"
                onChange={handleChange}
                value="12345678"
                className="form-control"
                type="password"
                id="password2"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="roleId">
            ระดับสิทธิ์
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <select
                name="roleId"
                onChange={handleChange}
                value={values.roleId}
                className="custom-select"
                id="roleId"
              >
                <option value="" label="เลือกระดับสิทธิ์">
                  เลือกระดับสิทธิ์
                </option>
                <option value="1">Admin</option>
                <option value="2">User</option>
                <option value="3">API</option>
              </select>
            </div>
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary pull-right"
          >
            ปรับข้อมูล
          </button>
          <a
            onClick={() => {
              props.history.goBack()
            }}
            type="Button"
            className="btn btn-default pull-right"
            style={{ marginRight: 10 }}
          >
            ยกเลิก
          </a>
        </div>
      </Form>
    )
  }

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content" style={{ maxWidth: '80%' }}>
        <div className="box box-primary" style={{ marginTop: 70 }}>
          <div className="box-header with-border">
            <p className="box-title" style={{ fontSize: 30 }}>
              แก้ไขผู้ใช้
            </p>
          </div>
          <div className="box-body" style={{ marginTop: 30 }}>
            <Formik
              enableReinitialize
              initialValues={result ? result : {}}
              onSubmit={async (values, { setSubmitting }) => {
                let formData = new FormData()
                formData.append('username', values.username)
                formData.append('password', values.password)
                formData.append('firstname', values.firstname)
                formData.append('lastname', values.lastname)
                formData.append('roleId', values.roleId)

                if (values.password === values.password2) {
                  dispatch(userEditActions.updateUser(props.history, formData))
                } else {
                  MySwal.fire({
                    title: 'ข้อมูลไม่ถูกต้อง',
                    text: 'กรุณายืนยันรหัสผ่านให้ถูกต้อง',
                    icon: 'warning',
                  })
                }
                // props.history.goBack()
                setSubmitting(false)
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2))
                //   setSubmitting(false)
                // }, 400)
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  )
}

export default withRouter(UserEdit)
