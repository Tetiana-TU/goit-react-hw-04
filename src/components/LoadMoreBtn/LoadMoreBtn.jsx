import React from "react";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleLoadMore, isActive }) => {
  return (
    <button
      className={css.loadmorebtn}
      onClick={handleLoadMore}
      type="button"
      disabled={isActive}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
