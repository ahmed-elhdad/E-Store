import usePrudoctList from "../api/hooks/usePrudocts";
import Loading from "./Loading";

const Prudocts = (props) => {
  const category = props.category;
  const { data, isLoading, isError } = usePrudoctList({
    category: category,
  });
  if (isLoading) return <Loading />;
  if (isError) return <p>some thing went wrong</p>;
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-3xlsm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((p, index) => (
            <div className="group relative">
              <img
                src={p.images[0]}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {p.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{p.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prudocts;
