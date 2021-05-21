import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    if (!this.props.enableSort) return;
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc ml-1"></i>;
    return <i className="fa fa-sort-desc ml-1"></i>;
  };
  render() {
    const { enableSort = false } = this.props;

    return (
      <thead className="thead-light align-middle">
        <tr>
          {this.props.columns.map((column) => (
            <th
              className={`align-middle text-center ${
                !enableSort ? "" : "pointer"
              }`}
              style={column.columnStyle}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.header ? column.header() : column.label}
              {enableSort && this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
