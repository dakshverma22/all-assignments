const sendSuccessResponse = (res, data, statusCode) => {
    const result = {
        success:true,
        data:data
    }
    return res.status(statusCode).json(result)
}
const sendFailureResponse = (res, data, statusCode) => {
    const result = {
        success:false,
        error:data
    }
    return res.status(statusCode).json(result)
}

module.exports = {sendFailureResponse, sendSuccessResponse}