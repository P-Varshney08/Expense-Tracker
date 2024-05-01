import axios from "axios";
import { Query } from "mongoose";

export const resolvers={
    Query:{
        welcome:()=>{
            return "welcome to Microservices"
        }
    },
    Mutation:{
        processMonthlyReport:async(_,args)=>{
            const {date,userId}=args;
            console.log(date);
            console.log(userId);
            try { 
                const response=await axios.post(`http://localhost:8080/api/user/ExpenseDetails/${userId}`,{
                    date
                })
                const data=response.data;
                console.log(data)
                return data;
                
            } catch (error) {
                console.log(error);
            }

        }


    }

}
export default resolvers;