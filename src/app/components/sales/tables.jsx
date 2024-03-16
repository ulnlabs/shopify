import React from 'react'

const Table = () => {
  const data = [
    //  data array
    {
      Student_Name: "deepath",
      id: 1,
      Type: "Minato",
      Standard: "III standard",
      Phone_Number: 123,
      ERP_Number: 5454,
      Status: "Active ",
      Details: "View",
    },
    {
      Student_Name: "deepath",
      id: 2,
      Type: "Minato",
      Standard: "III standard",
      Phone_Number: 123,
      ERP_Number: 5454,
      Status: "Active ",
      Details: "View",
    },
    {
      Student_Name: "deepath",
      id: 3,
      Type: "Minato",
      Standard: "III standard",
      Phone_Number: 123,
      ERP_Number: 5454,
      Status: "Active ",
      Details: "View",
    },
    {
      Student_Name: "deepath",
      id: 4,
      Type: "Minato",
      Standard: "III standard",
      Phone_Number: 123,
      ERP_Number: 5454,
      Status: "Active ",
      Details: "View",
    },
    {
      Student_Name: "deepath",
      id: 5,
      Type: "Minato",
      Standard: "III standard",
      Phone_Number: 123,
      ERP_Number: 5454,
      Status: "Active ",
      Details: "View",
    },
    {
      Student_Name: "deepath",
      id: 6,
      Type: "Minato",
      Standard: "III standard",
      Phone_Number: 123,
      ERP_Number: 5454,
      Status: "Active ",
      Details: "View",
    },
    {
      Student_Name: "deepath",
      id: 7,
      Type: "Minato",
      Standard: "III standard",
      Phone_Number: 123,
      ERP_Number: 5454,
      Status: "Active ",
      Details: "View",
    },
  ];

  const headings = Object.keys(data[0]);



  return (
    <div className="w-full border-b rounded-lg overflow-x-scroll">
      <table className='w-full'>
        <tr className='border-b text-center bg-blue-100 text-gray-600'>
          {
            headings.map((heading => {
              return (
                heading !== 'id' ? (
                  <th key={heading} className='p-2 text-center'>{heading}</th>
                ) : null
              )
            }))
          }
        </tr>
        {
          data.map((value) => {
            return <tr className='border-b'>
              {
                headings.map((header)=>{
                  return (
                    header === 'id'?null:
                    header === 'Details'?<td className='text-center' >{value[header]}</td>:
                    (
                      <td className='text-center'>{value[header]}</td>
                    )
                  )
                })
              } 
            </tr>
          }
          )}
        
        </table>
    </div>
  )
}
export default Table