import { useState, useEffect } from "react";

import { dateFormatter } from "../../utilities/dateFormatter";
import {
  TRequest,
  TableColumns,
  tableColumnsNames,
} from "../../utilities/types";

import {
  Table,
  withTableActions,
} from "@gravity-ui/uikit";

const MyRequestsTable = ({
  isAdminMode,
  getRowActions,
  handleOpenRequest,
  requests,
}: {
  isAdminMode: boolean,
  getRowActions:{},
  handleOpenRequest: (e: TRequest) => Promise<void>,
  requests:TRequest[] | undefined
}) => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState<
    TableColumns[] | undefined
  >();

  useEffect(() => {
    (() => {
      createTableColumns();
      createTableData();
    })();
  }, [requests]);

  const createTableColumns = () => {
    if (requests && requests.length > 0) {
      const columns = Object.keys(requests[0]).map((column) => ({
        name: tableColumnsNames[column],
        id: column,
      }));
      setTableColumns(columns);
    }
  };

  const createTableData = () => {
    if (requests) {
      const data: any = requests.map((request: TRequest) => ({
        ...request,
        createdAt: dateFormatter.format(new Date(request.createdAt)),
        atiCode: (
          <a
            href={`https://ati.su/firms/${request.atiCode}/info`}
            target="_blank"
          >
            {request.atiCode}
          </a>
        ),
      }));
      setTableData(data);
    }
  };

  const RequestsTable = withTableActions(Table);

  return (
    <div>
      {" "}
      {tableData && tableData.length > 0 && tableColumns && (
        <RequestsTable
          columns={tableColumns}
          data={tableData}
          emptyMessage="Заявок нет"
          getRowActions={isAdminMode ? (getRowActions as any) : undefined}
          onRowClick={isAdminMode ? (handleOpenRequest as any) : undefined}
        />
      )}
    </div>
  );
};

export default MyRequestsTable;
