// import React from 'react'
// import { useForm } from 'react-hook-form';
// import List from './List';
// // import {default as api} from '../store/apiSlice';

// export default function Form() {

//     const {register, handleSubmit, resetField} = useForm();
//      const onSubmit = async (data) => {
//         if(!data) return {

//         };
//         resetField('name');
//         resetField('amount')
//     }

//   return (
//     <div className="form max-w-sm mx-auto w-96">
//         <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
//         <form id='form' onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid gap-4">
//                 <div className="input-group">
//                     <input type="text" {...register('name')} placeholder='Sallary, House Rend, SIP' className='form-input' />
//                 </div>
//                 <select className='form-input' {...register('type')}>
//                     <option value="Investment" defaultValue>Investment</option>
//                     <option value="Expense">Expense</option>
//                     <option value="Savings">Savings</option>
//                 </select>
//                 <div className="input-group">
//                     <input type="text" {...register('amount')} placeholder='Amount' className='form-input' />
//                 </div>
//                 <div className="submit-btn">
//                     <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
//                 </div>
//             </div>    
//         </form>

//         <List></List>
//     </div>
//   )
// }



import React from 'react';
import { useForm } from 'react-hook-form';
import List from './List';

const Form = ({ addTransaction }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const { name, type, amount } = data;

        // Add a new transaction
        addTransaction({
            name,
            type,
            amount: parseFloat(amount),
            color: getColorByType(type),
        });

        // Reset the form fields
        reset();
    };

    const getColorByType = (type) => {
        if (type === 'income') {
            return '#4CAF50';
        } else if (type === 'expense') {
            return '#F44336';
        } else if (type === 'investment') {
            return '#2196F3';
        } else {
            return '#9E9E9E';
        }
    };

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input type="text" {...register('name')} placeholder='Sallary, House Rent, SIP' className='form-input' required />
                    </div>
                    <select className='form-input' {...register('type')}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="investment">Investment</option>
                    </select>
                    <div className="input-group">
                        <input type="number" step="0.01" {...register('amount')} placeholder='Amount' className='form-input' required />
                    </div>
                    <div className="submit-btn">
                        <button className='border py-2 text-white bg-purple-500 w-full'>Make Transaction</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
