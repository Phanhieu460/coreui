import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'

const EditEmployee = (props) => {
  const { visible, setVisible } = props
  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Update Employee</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputName" className="col-sm-2 col-form-label">
                Name
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="inputName" required placeholder="Name" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                Address
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="inputAddress" required placeholder="Address" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPhone" className="col-sm-2 col-form-label">
                Phone
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="inputPhone" required placeholder="Phone" />
              </CCol>
            </CRow>
            <CRow className="mt-2">
              <CCol className="d-flex justify-content-end">
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary" className="ms-1" type="submit">
                  Update
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  )
}
EditEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.any,
}
export default EditEmployee
