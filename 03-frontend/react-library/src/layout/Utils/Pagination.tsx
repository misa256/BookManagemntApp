import React, { FC } from "react";

type PageSetting = {
currentPage : number;
totalPage : number;
pagination : (arg0: number)=>void
}

export const Pagination:FC<PageSetting> = (props)=>{
    const {currentPage, totalPage, pagination} = props;
    const pageNumber = [];
    if(currentPage===1){
        pageNumber.push(currentPage);
        if(totalPage>=currentPage+1){
            pageNumber.push(currentPage+1);
        }
        if(totalPage>=currentPage+2){
            pageNumber.push(currentPage+2)
        }
    }else if(currentPage>1){
        if(currentPage>=3){
            pageNumber.push(currentPage-2);
            pageNumber.push(currentPage-1);
        }else{
            pageNumber.push(currentPage-1);
        }
        pageNumber.push(currentPage);
        if(totalPage >= currentPage+1){
            pageNumber.push(currentPage+1);
        }
        if(totalPage >= currentPage+2){
            pageNumber.push(currentPage+2);
        }

    }
return (
<nav aria-label="...">
                <ul className='pagination'>
                    <li className='page-item' onClick={() => pagination(1)}>
                        <button className='page-link'>
                            First Page
                        </button>
                    </li>
                    {pageNumber.map(number => (
                        <li key={number} onClick={() => pagination(number)} 
                            className={'page-item ' + (currentPage === number ? 'active' : '')}>
                                <button className='page-link'>
                                    {number}
                                </button>
                        </li>
                    ))}
                    <li className='page-item' onClick={() => pagination(totalPage)}>
                        <button className='page-link'>
                            Last Page
                        </button>
                    </li>
                </ul>
            </nav>
);
}