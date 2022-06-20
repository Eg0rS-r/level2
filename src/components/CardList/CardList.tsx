import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  fetchProducts,
  selectProducts,
  selectProductssStatus,
} from "../../redux/slices/productsSlice";
import { useAppDispatch } from "../../redux/store";

import Card from "../Card";
import CardSkeleton from "../Card/Skeleton";

import style from "./CardList.module.scss";

const CardList: React.FC = () => {
  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductssStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const ItemsList =
    productsStatus === "loading"
      ? [...new Array(3)].map((_, index) => (
          <li className={style.item} key={index}>
            <CardSkeleton />
          </li>
        ))
      : products.map((obj) => (
          <li className={style.item} key={obj.id}>
            <Card {...obj} />
          </li>
        ));

  return !products.length && productsStatus !== "loading" ? (
    <p className={style.notFound}>Ничего не найдено. Попробуйте позже😔</p>
  ) : (
    <ul className={style.list}>{ItemsList}</ul>
  );
};

export default CardList;
