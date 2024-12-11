import axios from "axios";

export const api = axios.create({
  baseURL: "https://vue-study.skillbox.cc/api",
});

// задержка для имитации загрузки
api.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(config);
    }, 500);
  });
});

export const get_products_data = (params) => {
  return api
    .get("/products", {
      params: {
        page: params.page,
        limit: params.limit,
        minPrice: params.priceFrom,
        maxPrice: params.priceTo,
        categoryId: params.categoryId,
        colorId: params.colorId,
      },
    })
    .then((response) => response.data);
};

export const get_product_data = (id) => {
  return api.get(`/products/${id}`).then((response) => response.data);
};

export const get_categories_data = () => {
  return api.get("/productCategories").then((response) => response.data);
};

export const get_colors_data = () => {
  return api.get("/colors").then((response) => response.data);
};

export const get_cart_data = (key) => {
  return api
    .get("/baskets", {
      params: {
        userAccessKey: key ?? "",
      },
    })
    .then((response) => response.data);
};

export const add_to_cart = ({ productId, amount, userAccessKey }) => {
  return api
    .post(
      "/baskets/products",
      { productId, quantity: amount },
      {
        params: {
          userAccessKey,
        },
      }
    )
    .then((response) => response.data);
};

export const delete_from_cart = ({ productId, userAccessKey }) => {
  return api
    .delete("/baskets/products", {
      params: {
        userAccessKey,
      },
      data: {
        productId,
      },
    })
    .then((response) => response.data);
};

export const update_product_amount = ({ productId, amount, userAccessKey }) => {
  return api
    .put(
      "/baskets/products",
      { productId, quantity: amount },
      {
        params: {
          userAccessKey,
        },
      }
    )
    .then((response) => response.data);
};
