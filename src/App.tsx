import { useEffect, useState,useCallback } from "react";
import { Button, Modal, Switch } from "@gravity-ui/uikit";
import "./App.scss";
import { NewRequestModal } from "./components/Modals/newRequestModal";
import { ShowRequestModal } from "./components/Modals/showRequestModal";
import { EditRequestModal } from "./components/Modals/editRequestModal";
import { FilterModal, FilterSet } from "./components/Modals/filterModal";
import MyRequestsTable from "./components/Table/table";
import { findRequest, deleteRequest, getAllRequests, getAllRequestsByFilter } from "./utilities/api";
import { TRequest } from "./utilities/types";

function App() {
  const [isNewRequestModalopen, setIsNewRequestModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false)

  const [currentRequest, setCurrentRequest] = useState({});
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [requests, setRequests] = useState<TRequest[] | undefined>();

  const handleOpenRequest = async (e: TRequest) => {
    const foundedRequest = await findRequest(e.id);
    setCurrentRequest(foundedRequest);
    setIsShowModalOpen(true);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const allRequests = await getAllRequests();
    setRequests(allRequests);
  };

  const getRowActions = () => {
    return [
      {
        text: "Редактировать",
        handler: async (e: TRequest) => {
          let id = e.id;
          let req = requests?.find((req) => {
            return req.id === id;
          });
          if (req) setCurrentRequest(req as any);
          setIsEditingModal(true);
        },
      },
      {
        text: "Удалить",
        handler: async (e: any) => {
          await deleteRequest(e.id);
          fetchRequests();
        },
      },
    ];
  };

  const onFilterChanged = useCallback(async (filters: FilterSet ) => {
    if(filters.requestId){
      const foundedRequest = await findRequest(String(filters.requestId));
      setRequests([foundedRequest]);
    }else{
      const requests = await getAllRequestsByFilter({
        ...filters,
      });
      setRequests(requests);
    }
  }, [findRequest, setRequests])

  return (
    <div className="app">
      <div className="app__buttons-wrapper">
        <Switch
          onChange={() => setIsAdminMode(!isAdminMode)}
          className="app__switch"
          content="AdminMode"
        />
        {isAdminMode && (
          <>
          <Button
            title="Создать новую заявку"
            onClick={() => setIsNewRequestModalOpen(true)}
          >
            Создать новую заявку
          </Button>

            <Button
            title="Фильтр заявок"
            onClick={() => setIsFilterModal(true)}
          >
            Фильтр заявок
          </Button>
        </>
        )}
      </div>

      <MyRequestsTable
        isAdminMode={isAdminMode}
        getRowActions={getRowActions}
        handleOpenRequest={handleOpenRequest}
        requests={requests}
      />

      <Modal
        open={isNewRequestModalopen}
        onClose={() => {
          setIsNewRequestModalOpen(false);
        }}
        children={
          <NewRequestModal
            onClose={() => {
              setIsNewRequestModalOpen(false);
              fetchRequests();
            }}
          />
        }
      />

      <Modal
        open={isShowModalOpen}
        onClose={() => {
          setIsShowModalOpen(false);
        }}
        children={<ShowRequestModal request={currentRequest as any} />}
      />

      <Modal
        open={isEditingModal}
        onClose={() => {
          setIsEditingModal(false);
          setCurrentRequest({});
        }}
        children={
          <EditRequestModal
            request={currentRequest as any}
            onClose={() => {
              fetchRequests();
              setIsEditingModal(false);
            }}
          />
        }
      />

      <Modal
        open={isFilterModal}
        onClose={() => {
          setIsFilterModal(false);
        }}
        children={<FilterModal requests={requests ?? []} onFilterChanged={onFilterChanged}/>}
      />
    </div>
  );
}

export default App;
