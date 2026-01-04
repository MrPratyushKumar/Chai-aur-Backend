// asyncHandler is a higher-order function
// It takes a controller (requestHandler) as input
// and returns a new Express middleware function
const asyncHandler = (requestHandler) => {

  // Return a middleware function that Express can execute
  return (req, res, next) => {

    /*
      Promise.resolve() ensures that:
      - If requestHandler is an async function, it already returns a Promise
      - If requestHandler is a normal function, it gets wrapped into a Promise

      This way, we can safely catch BOTH sync and async errors
    */
    Promise
      .resolve(requestHandler(req, res, next))

      /*
        If any error occurs inside requestHandler
        (e.g. DB failure, thrown error, rejected promise),
        it will be caught here and passed to Express
        error-handling middleware via next(err)
      */
      .catch((err) => next(err));
  };
};

// Export asyncHandler so it can be used to wrap route controllers
export { asyncHandler };





//asyncHandler -> is a Higher Order Function -> is a f'n which accept f'n as argument  or return a f'n
// const asyncHandler = (fn) => {}// step 1: take f'n as a argument
// const asyncHandler = (fn) => (fn) =>{} // step2: usi fn ko further argument me pass kar diya 
// const asyncHandler = (fn) =>  async() =>{}// step 3: make it async


// const asyncHandler = (fn) => async(req , re , next) =>{
//   try {
//     await fn(req , res , next)
//   } catch (error) { 
//     res.status(error.code || 500).json({
//       success:false,
//       message:err.message
//     })
//   }
// }




