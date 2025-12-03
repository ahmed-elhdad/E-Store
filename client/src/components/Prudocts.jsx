import { use, useEffect, useState } from "react";

import axios from "axios";
import { instance } from "../api/axiosInstant";
import usePrudoctList from "../api/hooks/usePrudoct";
import Loading from "./Loading";
const Prudocts = ({ category }) => {
  const [showCounter, setShowCounter] = useState(true),
    // { id, name = "", description, price, img, badge, isFavorite } = prudoct,
    [counter, setCounter] = useState(0),
    [items, setItems] = useState([]);
  const {
    data,

    isError,
    isFetched,

    isLoading,

    isSuccess,

    refetch,
    status,
  } = usePrudoctList;
  console.log(isSuccess);
  console.log(isError);

  return <div>{data}</div>;
  // return (
  //   <>
  //     <div>
  //       {isLoading ? (
  //         <Loading />
  //       ) : (
  //         <div>
  //           {data.data.map((item) => {
  //             <div>{item.title}</div>;
  //           })}
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );
};

export default Prudocts;

// Finish project, the cart desgin make it fll screen in mobile and the mobile size in the lg screen, make all logic i make it for add prudoct to cart and when the user click finish from the cart you should check if all data you send to server like the data in cart if no edit the quantity by the endpoint i am created in server to edit prudoct from cart, the item in cart is have a prudoctId you will get the prudocts from server and search in those about this prudoctId in the list
