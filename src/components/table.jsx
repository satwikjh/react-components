import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  columns,
  sortColumn,
  onSort,
  data,
  enableSort,
  getClassName,
  customHeader = false,
}) => {
  return (
    <table className="table table-sm table-bordered mb-0">
      {customHeader || (
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
          enableSort={enableSort}
        />
      )}
      <TableBody columns={columns} data={data} getClassName={getClassName} />
    </table>
  );
};

export default Table;
