import React from "react";

type TableViewProps<T> = {
  title: string;
  data: T[];
  columns?: (keyof T)[];
  linkedColumn?: (keyof T)[];
  linkItemKey?: string;
  route?: string;
  keyExtractor: (item: T) => React.Key;
};

const TableView = <T extends object>({
  title,
  data,
  columns,
  linkedColumn,
  linkItemKey,
  route,
  keyExtractor,
}: TableViewProps<T>) => {
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  if (linkedColumn && !route) {
    throw Error("Route prop is missing");
  }

  const keys = columns || (Object.keys(data[0]) as (keyof T)[]);
  if (linkedColumn && !linkItemKey) {
    linkItemKey = linkedColumn[0] as string;
  }
  const linkKey = linkItemKey as keyof T;
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            {keys.map((key) => (
              <th
                key={String(key)}
                className="py-3 px-6 text-left capitalize min-w-[150px]"
              >
                {String(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {keys.map((key) => (
                <td
                  key={String(key)}
                  className="py-3 px-6 text-left whitespace-nowrap"
                >
                  {linkedColumn?.includes(key) ? (
                    <a
                      className="hover:text-blue-500 hover:font-semibold"
                      href={`${route}/${encodeURIComponent(
                        String(item[linkKey])
                      )}`}
                    >
                      {String(item[key])}
                    </a>
                  ) : (
                    String(item[key])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
