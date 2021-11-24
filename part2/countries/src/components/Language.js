import React from "react"
const Language =({languages}) =>{

    return(
      <ul>
      {Object.values(languages).map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    )
}
export default Language