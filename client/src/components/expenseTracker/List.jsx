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
        <div className="item flex justify-between items-center bg-gray-50 py-2 px-4 rounded-r mb-2" style={{ borderRight: `8px solid ${transaction.color ?? '#e5e5e5'}` }}>
            <div className="flex items-center w-full">
                <span className='block w-1/3'>{transaction.name}</span>
                <span className='block w-1/3'>{transaction.type}</span>
                <span className='block w-1/3 text-right'>{transaction.amount}</span>
            </div>
            <button className='px-3' onClick={() => deleteTransaction(index)}>
                <box-icon color={transaction.color ?? '#e5e5e5'} size="15px" name="trash" ></box-icon>
            </button>
        </div>
    );
}

export default List;
