import React, { useState } from 'react'
import './userCreate.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'
import { withRouter } from 'react-router-dom'
import * as registerActions from '../../actions/register.action'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as Yup from 'yup'

const MySwal = withReactContent(Swal)

const UserCreate = (props) => {
  const dispatch = useDispatch()

  const [account, setAccount] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    password2: '',
  })

  const userCreateSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 4 chars minimum'),
    roleId: Yup.string().required('Role is required'),
  })

  const showForm = ({
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
  }) => {
    return (
      <Form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="firstname">
            ชื่อ
          </label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="firstname"
              id="firstname"
              className={
                errors.firstname && touched.firstname ? 'input-error' : null
              }
            />
            {/* <input
              name="firstname"
              onChange={handleChange}
              value={values.firstname}
              placeholder="โปรดระบุ"
              className="form-control"
              type="text"
              id="firstname"
            /> */}
          </div>
          <ErrorMessage name="firstname" component="span" className="error" />
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
                value={values.password}
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
                value={values.password2}
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
                <option value="" label="โปรดระบุ"></option>
                <option value="1">Admin</option>
                <option value="2">User</option>
                <option value="3">API</option>
              </select>
              {/* <input
                name={account.level}
                onChange={(e) =>
                  setAccount({ ...account, level: e.target.value })
                }
                // value={values.level}
                className="form-control"
                type="text"
                id="level"
              /> */}
            </div>
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            // disabled={isSubmitting}
            className="btn btn-primary pull-right"
            disabled={!(dirty && isValid)}
          >
            เพิ่ม
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
              เพิ่มผู้ใช้
            </p>
          </div>
          <div className="box-body" style={{ marginTop: 30 }}>
            <Formik
              // validate={(values) => {
              //   let errors = {}
              //   if (!values.firstname) errors.firstname = 'Enter Firstname'
              //   if (!values.lastname) errors.lastname = 'Enter Lastname'
              //   if (!values.username) errors.username = 'Enter Username'
              //   if (!values.password) errors.password = 'Enter Password'
              //   if (!values.password2) errors.password2 = 'Enter Password'
              //   if (!values.roleId) errors.roleId = 'Enter Role'
              //   return errors
              // }}
              validationSchema={userCreateSchema}
              initialValues={account}
              onSubmit={async (values, { setSubmitting }) => {
                let formData = new FormData()
                formData.append('username', values.username)
                formData.append('password', values.password)
                formData.append('firstname', values.firstname)
                formData.append('lastname', values.lastname)
                formData.append('roleId', values.roleId)

                if (values.password === values.password2) {
                  dispatch(registerActions.register(props.history, values))
                } else {
                  MySwal.fire({
                    title: 'ข้อมูลไม่ถูกต้อง',
                    text: 'กรุณายืนยันรหัสผ่านอีกครั้ง',
                    icon: 'warning',
                    // showCancelButton: true,
                    // confirmButtonText: 'ตกลง',
                  })
                }

                // await httpClient.post(`${server.USER_URL}/register`, formData)
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

export default withRouter(UserCreate)
