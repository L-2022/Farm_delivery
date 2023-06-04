import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (title) => {
  const { data } = await $authHost.post("api/brand", title);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchBasket = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/basket/", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const fetchDellBasket = async (id) => {
  const { data } = await $host.destroy("api/device/" + id);
  return data;
};

export const create = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const createReview = async (deviceId, userId, review) => {
  const { data } = await $authHost.post(
    "api/device/" + deviceId,
    userId,
    review
  );
  return data;
};

export const addBasketElement = async (id) => {
  const { data } = await $authHost.post("api/basket", id);
  return data;
};
