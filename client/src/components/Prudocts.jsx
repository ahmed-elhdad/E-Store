import React, { useContext, useMemo } from "react";
import { TechPrudoctsContext } from "../contexts/TechPrudoctsContext";
import Laoding from "./Laoding";
import PrudoctCard from "./PrudoctCard";
const Prudocts = ({
  items,
  title = "Products",
  subtitle,
  isLoading,
  filter,
  emptyMessage = "No products available right now.",
  className = "",
  gridClassName = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  showActions = true,
}) => {
  const handleAddToCart = () => {
    // Plane
  };
  const context = useContext(TechPrudoctsContext);
  const contextPrudocts = context?.prudocts;
  const contextIsLoaded = context?.isLoaded;

  let resolvedItems = useMemo(
    () => items ?? contextPrudocts ?? [],
    [items, contextPrudocts]
  );
  const mainItems = resolvedItems;
  if (filter) {
    for (let i = 0; i < resolvedItems.length; i++) {
      if (resolvedItems[i].payment == filter.payment) {
        const filterdItems = resolvedItems.filter({ payment: filter.payment });
        resolvedItems = filterdItems;
      }
      if (resolvedItems[i].price == filter.price) {
        const filterdItems = resolvedItems.filter({ price: filter.price });
        resolvedItems = filterdItems;
      } else {
        resolvedItems = mainItems;
      }
    }
  }
  const resolvedLoading =
    typeof isLoading === "boolean"
      ? isLoading
      : Boolean(context) && !contextIsLoaded;

  if (resolvedLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-12">
        <Laoding />
      </div>
    );
  }

  if (!resolvedItems?.length) {
    return (
      <div className="flex flex-1 items-center justify-center py-12">
        <p className="text-center text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <section className={`flex-1 ${className}`}>
      {(title || subtitle) && (
        <header className="mb-6">
          {title && (
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          )}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </header>
      )}

      <div className={gridClassName}>
        {resolvedItems.map((prudoct, index) => (
          <PrudoctCard
            key={prudoct?.id ?? `${prudoct?.name}-${index}`}
            prudoct={prudoct}
            showActions={showActions}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default Prudocts;
