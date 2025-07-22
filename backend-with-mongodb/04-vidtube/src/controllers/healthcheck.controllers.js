
    // import utilities
    import { ApiResponse } from "../utils/ApiResponse.js";
    import { asyncHandler } from "../utils/asyncHandler.js";

    // define the healthcheck controller
    const healthcheck = asyncHandler(async (req, res) => {
        return res.status(200).json(new ApiResponse(200, "Healthy", "Health check passed"));
    });

    // export the healthcheck controller
    export { healthcheck };