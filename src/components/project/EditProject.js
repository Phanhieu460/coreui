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
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from 'src/api/apiClient'
import moment from 'moment/moment'

const EditProject = () => {
  const [codeProject, setCodeProject] = useState()
  const [name, setName] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchById() {
      const res = await api.get(`/api/project/${params.id}`)
      if (res) {
        setCodeProject(res.ma)
        setName(res.ten)
        setStartDate(moment(res.ngayBatDau).format('MM/DD/YYYY'))
        setEndDate(moment(res.ngayKeThuc).format('MM/DD/YYYY'))
      }
    }
    fetchById()
  }, [params.id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await api.put(`/api/project/${params.id}`, {
      ma: codeProject,
      ten: name,
      ngayBatDau: startDate,
      ngayKeThuc: endDate,
    })
    if (response) {
      navigate('/project')
    }
  }

  return (
    <div>
      <CForm onSubmit={handleSubmit}>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputCode" className="col-sm-4 col-form-label">
            Mã Dự Án
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              id="inputCode"
              required
              placeholder="Mã Dự Án"
              value={codeProject}
              onChange={(e) => setCodeProject(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputName" className="col-sm-4 col-form-label">
            Tên Dự Án
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              id="inputName"
              required
              placeholder="Tên Dự Án"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputStartDate" className="col-sm-4 col-form-label">
            Ngày Bắt Đầu
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="date"
              id="inputStartDate"
              required
              placeholder="Ngày Bắt Đầu"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEndDate" className="col-sm-4 col-form-label">
            Ngày Kết Thúc
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="date"
              id="inputEndDate"
              required
              placeholder="Ngày Kết Thúc"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-2">
          <CCol className="d-flex justify-content-end">
            <CButton color="secondary" onClick={() => navigate('/project')}>
              Close
            </CButton>
            <CButton color="primary" className="ms-1" type="submit">
              Update
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </div>
  )
}

export default EditProject
