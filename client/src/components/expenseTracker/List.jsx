// import React from 'react'
// // import 'boxicons';
// // import {default as api} from '../store/apiSlice';

// export default function List() {
//     const data = [
//         { type: 'income', amount: 1000, color: '#4CAF50' },
//         { type: 'expense', amount: 500, color: '#F44336' },
//         { type: 'expense', amount: 300, color: '#4636F4' },
//         { type: 'income', amount: 1200, color: '#4CAF50' },
//         { type: 'expense', amount: 700, color: '#F44336' }
//       ];
//     const isFetching = true;
//     const isSuccess = true;
//     const isError = false;
//     let Transactions;

    
//     const handlerClick = (e) => {
//         if(!e.target.dataset.id) return 0;
//         // deleteTransaction({ _id : e.target.dataset.id })
//     }

//     if(isFetching){
//         Transactions = <div>Fetching</div>;
//     }else if(isSuccess){
//         Transactions = data.map((v, i) => <Transaction key={i} category={v} handler={handlerClick} ></Transaction>);
//     }else if(isError){
//         Transactions = <div>Error</div>
//     }


//   return (
//     <div className="flex flex-col py-6 gap-3">
//         <h1 className='py-4 font-bold text-xl'>History</h1>
//         {Transactions}
//     </div>
//   )
// }

// function Transaction({ category, handler }){
//     if(!category) return null;
//     return (
//         <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight : `8px solid ${category.color ??  "#e5e5e5"}`}}>
//             <button className='px-3' onClick={handler}><box-icon data-id={category._id ?? ''}  color={category.color ??  "#e5e5e5"} size="15px" name="trash" ></box-icon></button>            
//             <span className='block w-full'>{category.name ?? ''}</span>
//         </div>
//     )
// }

import React from 'react';

const List = ({ data, deleteTransaction }) => {
    return (
        <div className="flex flex-col py-6 gap-3">
            <h1 className='py-4 font-bold text-xl'>History</h1>
            {data.map((transaction, index) => (
                <Transaction
                    key={index}
                    transaction={transaction}
                    index={index}
                    deleteTransaction={deleteTransaction}
                />
            ))}
        </div>
    );
};

function Transaction({ transaction, index, deleteTransaction }) {
    return (
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight: `8px solid ${transaction.color ?? '#e5e5e5'}` }}>
            <button className='px-3' onClick={() => deleteTransaction(index)}>
                <box-icon color={transaction.color ?? '#e5e5e5'} size="15px" name="trash" ></box-icon>
            </button>
            <span className='block w-full'>{transaction.name}</span>
        </div>
    );
}

export default List;
