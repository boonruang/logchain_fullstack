import React, { Component } from 'react'
import './stockEdit.css'
import { imageUrl } from './../../constants'
import { Formik } from 'formik'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'
import { getProductById } from '../../actions/stock.action'
import { connect } from 'react-redux'

class StockEdit extends Component {
  componentDidMount() {
    let id = this.props.match.params.id
    this.props.getProductById(id)
    // alert(id);
  }
  showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Name
          </label>
          <div className="col-sm-10">
            <input
              name="name"
              onChange={handleChange}
              value={values.name}
              placeholder="โปรดระบุ"
              className="form-control"
              type="text"
              id="name"
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="stock">
            Stock
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="stock"
                onChange={handleChange}
                value={values.stock}
                className="form-control"
                type="number"
              />
              <span className="input-group-addon input-group-addon_custom">
                PCS.
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="price">
            Price
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="price"
                onChange={handleChange}
                value={values.price}
                className="form-control"
                type="number"
                id="price"
              />
              <span className="input-group-addon input-group-addon_custom">
                ฿
              </span>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: 15 }}>
          <div className="col-sm-12 col-sm-offset-2">
            {this.showPreviewImage(values)}

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
                      Add Picture{' '}
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
            Submit
          </button>
          <a
            onClick={() => {
              this.props.history.goBack()
            }}
            type="Button"
            className="btn btn-default pull-right"
            style={{ marginRight: 10 }}
          >
            Cancel
          </a>
        </div>
      </form>
    )
  }

  showPreviewImage = (values) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />
    } else if (values.image) {
      return (
        <img
          src={`${imageUrl}/images/${values.image}`}
          style={{ height: 100 }}
        />
      )
    }
  }

  render() {
    const { result } = this.props.stockReducer
    return (
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content" style={{ maxWidth: '80%' }}>
          <div className="box box-primary" style={{ marginTop: 70 }}>
            <div className="box-header with-border">
              <p className="box-title" style={{ fontSize: 30 }}>
                Create
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <Formik
                enableReinitialize
                initialValues={result ? result : {}}
                onSubmit={async (values, { setSubmitting }) => {
                  let formData = new FormData()
                  formData.append('id', values.id)
                  formData.append('name', values.name)
                  formData.append('price', values.price)
                  formData.append('stock', values.stock)
                  if (values.file) {
                    formData.append('image', values.file)
                  }
                  // this.props.addProduct(this.props.history, formData);
                  await httpClient.put(server.PRODUCT_URL, formData)
                  setSubmitting(false)
                  this.props.history.goBack()
                }}
              >
                {(props) => this.showForm(props)}
              </Formik>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({ stockReducer }) => ({
  stockReducer,
})

const mapDispatchToProps = {
  getProductById,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockEdit)
