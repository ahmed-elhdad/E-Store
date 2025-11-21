import React from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";

const fallbackImage = "/tech.png";

const PrudoctCard = ({
  prudoct = {},
  showActions = true,
  onAddToCart,
  onToggleFavorite,
}) => {
  const {
    id,
    name = "",
    description,
    price,
    img,
    badge,
    isFavorite,
  } = prudoct;

  return (
    <article
      key={id}
      className="flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gray-50">
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
        <img
          src={img || fallbackImage}
          alt={name}
          className="h-full w-full object-contain p-6"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {name}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between">
          {typeof price !== "undefined" ? (
            <span className="text-lg font-bold text-gray-900">${price}</span>
          ) : (
            <span className="text-sm text-gray-400">Pricing soon</span>
          )}
        </div>

        {showActions && (
          <div className="flex gap-2">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              onClick={() => onAddToCart?.(prudoct)}
            >
              Add <FaCartPlus />
            </button>
            <button
              className={`flex items-center justify-center rounded-lg border px-3 py-2 text-sm transition-colors ${
                isFavorite
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
              aria-pressed={Boolean(isFavorite)}
              onClick={() => onToggleFavorite?.(prudoct)}
            >
              <FaHeart />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PrudoctCard;
