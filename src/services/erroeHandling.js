export function asynchandlier(fn) {
  return (req, res, next) => {

      fn(req, res, next).catch(err => {

          next(new Error(err, { cause: 500 }))
      })


  }

}


export const globalErrorHandling = (err, req, res, next) => {
  if (err) {
      if (process.env.mood === "DEV") {
          res.status(err['cause' ]|| 500).json({ err: err.message,stack: err.stack })

      } else {
            res.status(err['cause'] || 500).json({ err: err.message })

      }

  }
}






 



