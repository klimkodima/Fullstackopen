import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState("all genres")
  const genres = ["refactoring", "agile", "patterns", "design", "crime", "classic", "all genres"]
  const sortByGenre = ( genre) => {
    setFilter(genre)
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p> in genre {filter}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks
          .filter(book => filter === 'all genres' ? book : book.genres.includes(filter))
          .map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
      {genres.map(genre => 
       <button key={genre} onClick = {() => sortByGenre(genre)}>{genre}</button>
      )}
      </div>
    </div>
  )
}

export default Books