import "./App.scss";
import { Table, withTableActions, TextInput } from "@gravity-ui/uikit";
import fakeRequests from "./utilities/fakeRequests";

function App() {
  const RequestsTable = withTableActions(Table);

  const tableColumns = Object.keys(fakeRequests[0]).map((column) => ({
    name: column,
    id: column,
  }));

  const tableData = fakeRequests.map((request) => ({
    ...request,
    ati: (
      <a href={`https://ati.su/firms/${request.ati}/info`} target="_blank">
        ati
      </a>
    ),
  }));

  const tableEditionData = fakeRequests.map((request) => {
    let newList = {};
    for (let [key, value] of Object.entries(request)) {
      newList[key] = <TextInput value={value} />;
    }
    return newList;
  });

  const getRowActions = () => {
    return [
      {
        text: "Edit",
        handler: (e) => {

          const toEditRequest = tableEditionData.find((request) => request.name === e.name);
          for ( toEditRequest )

          return 
        },
      },
    ];
  };

  return (
    <div className="app">
      <RequestsTable
        columns={tableColumns}
        data={tableData}
        verticalAlign="middle"
        getRowActions={getRowActions}
        onRowClick={(e) => console.log(e)}
      />
    </div>
  );
}

export default App;
