class ApiResponse {
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse }