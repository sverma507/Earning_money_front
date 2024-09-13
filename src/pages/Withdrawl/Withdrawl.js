// e.preventDefault();
//     console.log("recharge auth=>", auth);
//     try {
        
//         const token = auth.token;
//         const id = auth?.user.id;
  
//         const result = await axios.post(
//           'https://mlm-back.onrender.com/api/v1/payment/recharge-wallet',
//           { customAmount, id, name, bankNumber, ifsc }, // This is the request body
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         console.log("result recharge=>", result.data.data.data.transaction_id);
//         if(result.data.data.status){
//             let transactionId = result.data.data.data.transaction_id;
//             let pg_reference_no = result.data.data.data.PaymentReferenceNo;
//             let paymentToken = result.data.paymentToken;
//             let userId = auth?.user.id;
//             try {
//                 let paymentResponse = await axios.post(
//                     'https://mlm-back.onrender.com/api/v1/payment/verify-wallet-recharge',
//                     { transactionId, pg_reference_no, paymentToken, userId }, // This is the request body
//                     {
//                       headers: {
//                         Authorization: `Bearer ${token}`,
//                       },
//                     }
//                   )
//                   console.log(paymentResponse);
                  
//             } catch (error) {
//                 console.log(error);
                
//             }
//         }

//       } catch (error) {
//           toast.error(error.response.data.message || "Something went wrong. Please try again.");
//       }