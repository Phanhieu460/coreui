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

const CreateProject = (props) => {
  const { visible, setVisible } = props
  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Create Project</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputName" className="col-sm-2 col-form-label">
                Name
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  tooltipFeedback
                  type="text"
                  id="inputName"
                  required
                  placeholder="Name"
                  feedbackInvalid="Please enter name in the input"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                Address
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  tooltipFeedback
                  type="text"
                  id="inputAddress"
                  required
                  placeholder="Address"
                  feedbackInvalid="Please enter address in the input"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPhone" className="col-sm-2 col-form-label">
                Phone
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  tooltipFeedback
                  type="text"
                  id="inputPhone"
                  required
                  placeholder="Phone"
                  feedbackInvalid="Please enter phone in the input"
                />
              </CCol>
            </CRow>
            <CRow className="mt-2">
              <CCol className="d-flex justify-content-end">
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary" className="ms-1" type="submit">
                  Create
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

CreateProject.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.any,
}

export default CreateProject
