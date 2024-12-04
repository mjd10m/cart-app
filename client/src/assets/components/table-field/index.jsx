import React from 'react'

function TableField({customerData, id}) {
  function convertDate(date) {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-us',{year:"numeric", month:"2-digit", day:"2-digit",timeZone: "UTC"})
  }
  return (
    <td id={id}>{id === "dob" || id === "createdAt" ? convertDate(customerData[id]):customerData[id]}</td>
  )
}

export default TableField
