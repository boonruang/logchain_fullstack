import React, { useState, useEffect } from 'react'
import './userCreate.css'
import { Formik } from 'formik'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../../actions/user.action'

const UserCreate = (props) => {
  useEffect(() => {
    callActions()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callActions = () => {
    dispatch(userActions.getUsers())
  }

  const userReducer = useSelector(({ userReducer }) => userReducer)
  const dispatch = useDispatch()

  const { result, isFetching } = userReducer

  const [account, setAccount] = useState({
    username: 'admin',
    password: '1234',
    firstname: 'system',
    lastname: 'admin',
    level: 'normal',
  })

  const [submitting, setSubmitting] = useState(false)

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="firstname">
            ชื่อ
          </label>
          <div className="col-sm-10">
            <input
              name={account.firstname}
              onChange={(e) =>
                setAccount({ ...account, firstname: e.target.value })
              }
              // value={values.username}
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
              name={account.lastname}
              onChange={(e) =>
                setAccount({ ...account, lastname: e.target.value })
              }
              // value={values.username}
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
              name={account.username}
              onChange={(e) =>
                setAccount({ ...account, username: e.target.value })
              }
              // value={values.username}
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
                name={account.password}
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
                // value={values.password}
                className="form-control"
                type="password"
                id="password"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="level">
            ระดับสิทธิ์
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name={account.level}
                onChange={(e) =>
                  setAccount({ ...account, level: e.target.value })
                }
                // value={values.level}
                className="form-control"
                type="text"
                id="level"
              />
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: 15 }}>
          <div className="col-sm-12 col-sm-offset-2">
            {showPreviewImage(values)}

            <div className="wrap-upload-buttons control-label">
              <ul className="btn-nav row" id="rcorners">
                <li>
                  <span style={{ marginLeft: 2 }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                      style={{ width: 25, height: 20 }}
                    />
                    <span style={{ color: '#00B0CD', marginLeft: 10 }}>
                      {' '}
                      เพิ่มรูป{' '}
                    </span>
                    <input
                      onChange={(e) => {
                        e.preventDefault()
                        setFieldValue('file', e.target.files[0]) // for upload image
                        setFieldValue(
                          'file_obj',
                          URL.createObjectURL(e.target.files[0]),
                        ) // for preview image
                      }}
                      type="file"
                      name="image"
                      className="picupload"
                      multiple
                      accept="image/*"
                      style={{ padding: '20px 0' }}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary pull-right"
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
      </form>
    )
  }

  const showPreviewImage = (values) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />
    }
  }

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content" style={{ maxWidth: '80%' }}>
        <div className="box box-primary" style={{ marginTop: 70 }}>
          <div className="box-header with-border">
            <p className="box-title" style={{ fontSize: 30 }}>
              สร้างผู้ใช้งาน
            </p>
          </div>
          <div className="box-body" style={{ marginTop: 30 }}>
            <Formik
              initialValues={account}
              onSubmit={async (account, { setSubmitting }) => {
                let formData = new FormData()
                formData.append('username', account.username)
                formData.append('password', account.password)
                formData.append('level', account.level)
                formData.append('image', account.file)
                // this.props.addProduct(this.props.history, formData);
                await httpClient.post(server.PRODUCT_URL, formData)
                this.props.history.goBack()
                setSubmitting(false)
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
