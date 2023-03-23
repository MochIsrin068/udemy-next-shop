// custom error classes
export class ApiError extends Error {
  constructor(url: any, public status: number) {
    super(`'${url}' returned ${status}`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = "ApiError";
    this.status = status;
  }
}

export const fetchJson = async (url: string, options?: any) => {
  const response = await fetch(url, options);
  // Handling error
  if (!response.ok) {
    // throw new Error(`request failed: ${response.status}`); // default
    throw new ApiError(url, response.status); // custome
  }
  return await response.json();
};
