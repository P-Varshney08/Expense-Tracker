// import React from 'react'
// // import {default as api} from '../store/apiSlice';
// import { getLabels } from './helper/helper.js';

// export default function Labels() {

// //    const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
// const data = [
//     // { type: 'income', amount: 1000, color: '#4CAF50' },
//     // { type: 'expense', amount: 500, color: '#F44336' },
//     // { type: 'expense', amount: 300, color: '#4636F4' },
//     // { type: 'income', amount: 1200, color: '#4CAF50' },
//     // { type: 'expense', amount: 700, color: '#F44336' }
//   ];
//     const isFetching = true;
//     const isSuccess = true;
//     const isError = false;
//     let Transactions;

    

//     if(isFetching){
//         Transactions = <div>Fetching</div>;
//     }else if(isSuccess){
//         Transactions = getLabels(data, 'type').map((v, i) => <LabelComponent key={i} data={v}></LabelComponent>);
//     }else if(isError){
//         Transactions = <div>Error</div>
//     }

//   return (
//     <>
//         {Transactions}
//     </>
//   )
// }

// function LabelComponent({ data }){
//     if(!data) return <></>;
//     return (
//         <div className="labels flex justify-between">
//             <div className="flex gap-2">
//                 <div className='w-2 h-2 rounded py-3' style={{background: data.color ?? '#f9c74f'}}></div>
//                 <h3 className='text-md'>{data.type ?? ''}</h3>
//             </div>
//             <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
//         </div>
//     )
// }


import React from 'react';
import { getLabels } from './helper/helper.js';

export default function Labels({ data }) {
    let Transactions;

    if (!data) {
        Transactions = <div>Loading...</div>;
    } else {
        Transactions = getLabels(data, 'type').map((v, i) => <LabelComponent key={i} data={v} />);
    }

    return (
        <>
            {Transactions}
        </>
    );
}

function LabelComponent({ data }) {
    if (!data) return null;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className='w-2 h-2 rounded py-3' style={{ background: data.color ?? '#f9c74f' }}></div>
                <h3 className='text-md'>{data.type ?? ''}</h3>
            </div>
            <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
        </div>
    );
}
