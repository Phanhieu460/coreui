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
  CFormSelect,
  CFormInput,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import React, { useState } from 'react'
import { cilColorBorder, cilPlus, cilDelete, cilChevronLeft, cilChevronRight } from '@coreui/icons'
import CreateEmployee from 'src/components/employee/CreateEmployee'
import EditEmployee from 'src/components/employee/EditEmployee'

const Employee = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [page, setPage] = useState(1)

  const handleClickPrevious = () => {
    if (page <= 1) {
      return
    }
    setPage(page - 1)
  }

  return (
    <div className="employee">
      <CRow className="d-flex justify-content-between p-2">
        <CCol span={6}>
          <CFormInput size="sm" type="text" placeholder="Search by..." />
        </CCol>
        <CCol span={6} className="d-flex justify-content-end">
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
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
            <CTableDataCell>@twitter</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem onClick={handleClickPrevious}>
          {' '}
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>{page}</CPaginationItem>
        <CPaginationItem onClick={() => setPage(page + 1)}>
          {' '}
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
      <CModal visible={isDelete} onClose={() => setIsDelete(false)}>
        <CModalHeader onClose={() => setIsDelete(false)}>
          <CModalTitle>Delete Employee</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to delete this employee?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsDelete(false)}>
            Close
          </CButton>
          <CButton color="primary">Delete</CButton>
        </CModalFooter>
      </CModal>
      <CreateEmployee visible={isCreate} setVisible={setIsCreate} />
      <EditEmployee visible={isEdit} setVisible={setIsEdit} />
    </div>
  )
}

export default Employee
