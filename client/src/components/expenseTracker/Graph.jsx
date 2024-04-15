// import React from 'react'
// import { Doughnut } from 'react-chartjs-2';
// import {Chart, ArcElement} from 'chart.js'
// import Labels from './Labels';
// import { chart_Data, getTotal } from './helper/helper.js'
// // import {default as api} from '../store/apiSlice';

// Chart.register(ArcElement);

// export default function Graph() {
//     const data = [
//         { type: 'income', amount: 1000, color: '#6B4CAF' },
//         { type: 'expense', amount: 500, color: '#F44336' },
//         { type: 'income', amount: 1200, color: '#4CAF50' },
//         { type: 'expense', amount: 700, color: '#F44336' }
//       ];
//     const isFetching = false;
//     const isSuccess = true;
//     const isError = false;
// //   const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
//   let graphData;

  

//   if(isFetching){
//     graphData = <div>Fetching</div>;
//   }else if(isSuccess){
//     graphData = <Doughnut {...chart_Data(data)}></Doughnut>;
//   }else if(isError){
//     graphData = <div>Error</div>
//   }


//   return (
//     <div className="flex justify-content max-w-xs mx-auto">
//         <div className="item">
//             <div className="chart relative">
//                 {graphData}
//                 <h3 className='mb-4 font-bold title'>Total
//                     <span className='block text-3xl text-emerald-400'>${getTotal(data) ?? 0}</span>
//                 </h3>
//             </div>   

//             <div className="flex flex-col py-10 gap-4">
//                 {/* Labels */}
//                 <Labels></Labels>
//             </div> 
//         </div>
//     </div>
//   )
// }


import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';
import { chart_Data, getTotal } from './helper/helper.js';

Chart.register(ArcElement);

export default function Graph({ data }) {
    let graphData;

    if (!data) {
        graphData = <div>Loading...</div>;
    } else {
        graphData = <Doughnut {...chart_Data(data)} />;
    }

    return (
        <div className="flex justify-content max-w-xs mx-auto">
            <div className="item">
                <div className="chart relative">
                    {graphData}
                    <h3 className='mb-4 font-bold title'>Total
                        <span className='block text-3xl text-emerald-400'>${getTotal(data) ?? 0}</span>
                    </h3>
                </div>
                <div className="flex flex-col py-10 gap-4">
                    <Labels data={data} />
                </div>
            </div>
        </div>
    );
}
