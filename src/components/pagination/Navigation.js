import React from 'react'
import { Pagination } from 'antd'

const Navigation = (props) => {
  const { total, setPage, page, setPageSize } = props
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize)
    setPage(current)
    setPageSize(pageSize)
  }
  return (
    <>
      <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} total={total} />
    </>
  )
}

export default Navigation
