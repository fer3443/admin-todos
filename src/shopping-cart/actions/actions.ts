import { getCookie, hasCookie, setCookie } from "cookies-next";

/*
lo que voy a recibir es un objeto 
*/
export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }
  return {};
};

export const addProductCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductsFromCart = (id:string) => {
  const cookieCart = getCookieCart()
  // if(cookieCart[id]){
  //   cookieCart[id] = 0
  // }
  delete cookieCart[id]

  setCookie("cart", JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id:string) => {
  const cookieCart = getCookieCart()
  if(cookieCart[id] && cookieCart[id] > 0){
    cookieCart[id] = cookieCart[id] - 1
  }else if(cookieCart[id] === 0){
    delete cookieCart[id]
  }
  setCookie("cart", JSON.stringify(cookieCart))
}