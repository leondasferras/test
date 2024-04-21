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

import { TableDataItem,TableActionConfig } from "@gravity-ui/uikit";


type TTableData = {
  id: string;
  createdAt: string;
  companyName: string;
  driverName: string;
  driverPhoneNumber: string;
  commentary: string;
  requestStatus: string;
  atiCode: JSX.Element;
}


const MyRequestsTable = ({
  isAdminMode,
  getRowActions,
  handleOpenRequest,
  requests,
}: {
  isAdminMode: boolean,
  getRowActions:(item: TableDataItem, index: number) => TableActionConfig<TableDataItem>[],
  handleOpenRequest: (e:TableDataItem) => Promise<void>,
  requests:TRequest[] | undefined
}) => {
  const [tableData, setTableData] = useState<Array<TTableData>>([]);
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
    if (requests && requests.length > 0) {
      const data: TTableData[] = requests.map((request: TRequest) => ({
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
          getRowActions={isAdminMode ? getRowActions : undefined}
          onRowClick={(e) => handleOpenRequest(e) }
        />
      )}
    </div>
  );
};

export default MyRequestsTable;
