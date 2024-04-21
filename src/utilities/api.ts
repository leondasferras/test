import { TNewRequest, GetRequestsByFilterRequest } from "./types";

const baseUrl = "http://localhost:3000";

export const getAllRequests = async () => {
  try {
    const response = await fetch(`${baseUrl}/requests`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getAllRequestsByFilter = async (
  request: GetRequestsByFilterRequest
) => {
  try {
    const response = await fetch(`${baseUrl}/requests/by-filter`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if(response.status == 204){
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const createNewRequest = async (newRequest: TNewRequest) => {
  try {
    await fetch(`${baseUrl}/requests`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequest),
    });
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const findRequest = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/requests/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const editRequest = async (id: string, changedData: object) => {
  try {
    const response = await fetch(`${baseUrl}/requests/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const deleteRequest = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/requests/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};
