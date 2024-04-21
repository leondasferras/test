import { ChangeEvent, useState } from "react";
import { TextInput, Button, Select } from "@gravity-ui/uikit";
import "./modal.scss";
import { editRequest } from "../../utilities/api";
import { atiCodesSelector, TRequest } from "../../utilities/types";

export const EditRequestModal = ({
  onClose,
  request,
}: {
  onClose: () => void;
  request: TRequest;
}) => {
  const [formdata, setFormData] = useState(request);

  const [selectData, setSelectData] = useState("");

  const handleClickButton = async () => {
    let requestData
    if (selectData) {
    requestData = { ...formdata, requestStatus: selectData };}
    else requestData={...formdata}
    await editRequest(request.id, requestData);
    onClose();
  };

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  return (
    <form className="modal">
      <h2>Редактирование заявки</h2>
      <TextInput
        name="companyName"
        value={formdata.companyName}
        label="Фирма клиента"
        onChange={handleInputValue}
      />
      <TextInput
        name="driverPhoneNumber"
        value={formdata.driverPhoneNumber}
        label="Телефон"
        onChange={handleInputValue}
      />
      <TextInput
        name="driverName"
        value={formdata.driverName}
        label="ФИО перевозчика"
        onChange={handleInputValue}
      />
      <TextInput
        name="commentary"
        value={formdata.commentary}
        label="Комментарий"
        onChange={handleInputValue}
      />
      <Select
        defaultValue={[formdata.requestStatus]}
        name="requestStatus"
        options={atiCodesSelector}
        label="Статус заявки"
        onUpdate={(e) => {
          setSelectData(e[0]);
        }}
      />
        <TextInput
        name="atiCode"
        value={formdata.atiCode}
        label="код ATI"
        onChange={handleInputValue}
      />
      <Button children="Сохранить" onClick={() => handleClickButton()} />
    </form>
  );
};
