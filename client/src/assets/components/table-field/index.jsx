import React from 'react'

function TableField({customerData, id}) {
  function convertDate(date) {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-us',{year:"numeric", month:"numeric", day:"numeric"})
  }
  return (
    <td id={id}>{id === "dob"? convertDate(customerData[id]):customerData[id]}</td>
  )
}

export default TableField
