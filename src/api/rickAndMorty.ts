import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const fetchCharacters = async (params: Record<string, string>) => {
    const controller = new AbortController();
    const request = api.get("/character", { params, signal: controller.signal });
    // Return cancel method to caller
    return { request: request.then(res => res.data), cancel: () => controller.abort() };
};

export const fetchCharacterById = async (id: string) => {
    const res = await api.get(`/character/${id}`);
    return res.data;
};
