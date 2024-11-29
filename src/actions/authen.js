export const checkAuthen = (status) => {
   return {
      type: "CHECK_AUTHEN",
      status: status
   };
}

// export const updateCart = (itemId, number) => {
//    return {
//       type: "UPDATE_CART",
//       id: itemId,
//       number: number
//    };
// }

// export const deleteItem = (itemId) => {
//    return {
//       type: "DELETE_ITEM",
//       id: itemId
//    };
// }

// export const deleteAllItems = () => {
//    return {
//       type: "DELETE_ALL_ITEMS"
//    };
// }