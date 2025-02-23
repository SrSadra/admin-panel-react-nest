import React from 'react'

const Paginator = ({currectPage ,lastPage , pageChanged}: {currectPage:number , lastPage: number, pageChanged: (page:number) => void}) => {

    const onNextPage = () => {
        if (currectPage < lastPage){
            pageChanged(currectPage + 1);
        }
    }

    const onPrevPage = () => {
        if (currectPage > 0){
            pageChanged(currectPage - 1);
        }
    }

  return (
    <nav>
    <ul className='pagination'>
        <li className='page-item'>
            <a href='#' onClick={onPrevPage}>prev</a>
        </li>
        <li className='page-item'>
            <a href='#' onClick={onNextPage}>next</a>
        </li>
    </ul>
    </nav>
  )
}

export default Paginator
