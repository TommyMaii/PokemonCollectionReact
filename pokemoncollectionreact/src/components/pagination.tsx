import React, {useState} from 'react';



const Pagination = ({ postsPerPage, length, handlePagination } :any) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {

        paginationNumbers.push(i);

    }

    return (

        <div className='pagination'>

            {paginationNumbers.map((pageNumber) => (

                <button key={pageNumber} onClick={() => handlePagination(pageNumber)}>{pageNumber}</button>

            ))}

        </div>

    );

};

export default Pagination;

