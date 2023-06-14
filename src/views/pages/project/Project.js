import CIcon from '@coreui/icons-react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
} from '@coreui/react'
import React, { useState } from 'react'
import { cilColorBorder, cilPlus, cilDelete, cilChevronLeft, cilChevronRight } from '@coreui/icons'
import CreateProject from 'src/components/project/CreateProject'
import EditProject from 'src/components/project/EditProject'

const Project = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [page, setPage] = useState(1)

  return (
    <div className="employee">
      {/* <CFormInput type="text" id="search" placeholder="Search by ..." /> */}
      <CRow className="d-flex justify-content-center p-2">
        <CCol className="d-flex justify-content-between">
          <form className="form ">
            <label htmlFor="search">
              <input
                className="input"
                type="text"
                required=""
                placeholder="Search by ..."
                id="search"
              />
              <div className="fancy-bg"></div>
              <div className="search">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
              </div>
            </label>
          </form>
          <CButton color="success" onClick={() => setIsCreate(!isCreate)}>
            <CIcon icon={cilPlus} /> Create
          </CButton>
        </CCol>
      </CRow>
      <CTable className="text-center" responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" className="w-5">
              STT
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Class
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Heading
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Heading
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Mark</CTableDataCell>
            <CTableDataCell>Otto</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
            <CTableDataCell>
              <CButton variant="ghost" onClick={() => setIsEdit(!isEdit)}>
                <CIcon icon={cilColorBorder} />
              </CButton>
              <CButton variant="ghost" onClick={() => setIsCreate(!isCreate)}>
                <CIcon icon={cilPlus} />
              </CButton>
              <CButton variant="ghost" onClick={() => setIsDelete(!isDelete)}>
                <CIcon icon={cilDelete} />
              </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jacob</CTableDataCell>
            <CTableDataCell>Thornton</CTableDataCell>
            <CTableDataCell>@fat</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <div className="d-flex justify-content-center align-items-center">
        <CButton variant="ghost" onClick={() => setPage(page - 1)}>
          <CIcon icon={cilChevronLeft} />
        </CButton>
        <span style={{ padding: 5, fontWeight: 600 }}>{page}</span>
        <CButton variant="ghost" onClick={() => setPage(page + 1)}>
          <CIcon icon={cilChevronRight} />
        </CButton>
      </div>
      <CModal visible={isDelete} onClose={() => setIsDelete(false)}>
        <CModalHeader onClose={() => setIsDelete(false)}>
          <CModalTitle>Delete Project</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to delete this project?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsDelete(false)}>
            Close
          </CButton>
          <CButton color="primary">Delete</CButton>
        </CModalFooter>
      </CModal>
      <CreateProject visible={isCreate} setVisible={setIsCreate} />
      <EditProject visible={isEdit} setVisible={setIsEdit} />
    </div>
  )
}

export default Project
