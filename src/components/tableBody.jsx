import React from "react";
import _ from "lodash";

const TableBody = ({ data, getClassName = () => "", columns }) => {
  const renderCell = (item, column, rowIndex) => {
    if (column.content) return column.content(item, rowIndex);
    return <div className={column.className}>{_.get(item, column.path)}</div>;
  };

  return (
    <tbody>
      {data.map((item, rowIndex) => (
        <tr key={rowIndex} className={getClassName(rowIndex)}>
          {columns.map((column, i) => (
            <td className="align-middle" key={i}>
              {renderCell(item, column, rowIndex)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
