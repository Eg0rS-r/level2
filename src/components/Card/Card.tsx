import React, { useRef, useState } from "react";

import style from "./Card.module.scss";

import catImg from "../../assets/images/cat.png";

interface CardProps {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  info: {
    serving: number;
    gift: number;
    cool: boolean;
  };
  weight: string;
  footnote: {
    selected: string;
  };
  presence: boolean;
}

const Card: React.FC<CardProps> = ({
  tagline,
  title,
  subtitle,
  info: { serving, gift, cool },
  weight,
  footnote: { selected },
  presence,
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [cardStatus, setCardStatus] = useState<'default' | 'disabled' | 'selected'>(
    presence ? "default" : "disabled"
  );
  const [hoverActive, setHoverActive] = useState<string>(style.card_hover);

  const cardClassName = [
    style.card,
    hoverActive,
    cardStatus === "disabled" ? style.card_disabled : "",
    cardStatus === "selected" ? style.card_selected : "",
  ].join(" ");

  const handleCardMouseLeave = (e: MouseEvent) => {
    e.preventDefault();

    setHoverActive(style.card_hover);
    cardRef.current?.removeEventListener("mouseleave", handleCardMouseLeave);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

		setCardStatus(cardStatus === "default" ? "selected" : "default");
		if (e.target === cardRef.current) {
			setHoverActive("");
			cardRef.current?.addEventListener("mouseleave", handleCardMouseLeave);
		} 
  };

  const InfoList: JSX.Element[] = [
    serving ? (
      <p key="serving" className={style.text}>
        <span>{serving}</span> порций
      </p>
    ) : <></>,
    gift ? (
      <p key="gift" className={style.text}>
        {gift !== 1 ? <span>{gift}</span> : "мышь"}
        {gift > 4 ? " мышей" : gift !== 1 ? " мыши" : ""} в подарок
      </p>
    ) : <></>,
    cool ? (
      <p key="cool" className={style.text}>
        заказчик доволен
      </p>
    ) : <></>,
  ];

  const Footnote: JSX.Element =
    cardStatus === "default" ? (
      <p className={style.footnote}>
        Чего сидишь? Порадуй котэ,{" "}
        <button
          className={style.btn}
          aria-label={"Добавить " + title + " " + subtitle}
          onClick={handleCardClick}
        >
          купи.
        </button>
      </p>
    ) : cardStatus === "selected" ? (
      <p className={style.footnote}>{selected}</p>
    ) : cardStatus === "disabled" ? (
      <p className={style.footnote}>Печалька, {subtitle} закончился.</p>
    ) : <></>;

  return (
    <>
      <button
        ref={cardRef}
        type="button"
        onClick={handleCardClick}
        className={cardClassName}
        disabled={cardStatus === "disabled"}
      >
        <p className={style.tagline}>{tagline}</p>
        <h4 className={style.title}>{title}</h4>
        <h5 className={style.subtitle}>{subtitle}</h5>
        <div className={style.info}>{InfoList}</div>
        <div className={style.weight}>
          <span>{weight}</span> <br />
          кг
        </div>
        <img className={style.cat} src={catImg} alt="cute cat" />
      </button>
      {Footnote}
    </>
  );
};

export default Card;
