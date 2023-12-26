import { toast } from "react-toastify";
import { BASE_URL } from "../config/url";

export const headerSetter = () => {
    let header;
    let token = localStorage.getItem("token");
    if (token) {
        header = {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    } else {
        header = {
            "Content-Type": "application/json",
        }
    }
    return header;
}

export const get = async (path, setData, setIsLoading) => {
    const completeUrl = `${BASE_URL}${path}`;
    setIsLoading(true);
    try {
        const response = await fetch(completeUrl);
        console.log(response, "this is response");
        if (response.ok) {
            let data;
            if (path.includes("get_data")) {
                data = await response.text();
            } else {
                data = await response.json();
            }
            console.log(data, "<<<<<<<<<<<<<<<<<<<<<");
            setData(data);
        } else {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        setIsLoading(false);
    }
};

export const getSendData = async (path, body, setData, setIsLoading) => {
    const completeUrl = `${BASE_URL}${path}`;
    console.log(completeUrl, "<<<<<<<<<<<<<<<<")
    setIsLoading(true);
    try {
        const response = await fetch(completeUrl, {
            method: "GET",
            body: JSON.stringify(body),
            headers: headerSetter(),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data, "<<<<<<<<<<<<<<<<<<<<<");
            setData(data);
        } else {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        setIsLoading(false);
    }
};

export const post = async (path, body, isFormData, setData, setIsLoading) => {
    const completeUrl = `${BASE_URL}${path}`;
    setIsLoading(true);
    let response;
    console.log(body);
    try {
        if (isFormData) {
            response = await fetch(completeUrl, {
                method: "POST",
                body: body,
            });
        } else {
            response = await fetch(completeUrl, {
                method: "POST",
                body: JSON.stringify(body),
                headers: headerSetter(),
            });
        }
        console.log(response, "response");
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setData(data);

        } else {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }
    } catch (err) {
        toast.error(err || "Something went wrong!");
        console.error("An error occurred:", err);
    } finally {
        setIsLoading(false);
    }
}

export const deleteAPI = async (path, body, setData, setIsLoading) => {
    const completeUrl = `${BASE_URL}${path}`;
    setIsLoading(true);
    try {
        const response = await fetch(completeUrl, {
            method: "DELETE",
            headers: headerSetter(),
            body: body ? JSON.stringify(body) : null,
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setData(data);
        } else {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }
    } catch (err) {
        toast.error(err || "Something went wrong!");
        console.error("An error occurred:", err);
    } finally {
        setIsLoading(false);
    }
}