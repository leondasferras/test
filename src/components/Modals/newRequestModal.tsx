import { ChangeEvent, useState } from "react";
import { TextInput, Button } from "@gravity-ui/uikit";
import "./modal.scss";
import { createNewRequest } from "../../utilities/api";
import {newRequestSchema} from "../../utilities/validator";

export const NewRequestModal = ({onClose}:{onClose:()=> void}) => {

    const [formdata, setFormData] = useState({
      companyName: '',
      driverName: '',
      driverPhoneNumber: '',
      commentary: '',
      requestStatus: '',
      atiCode:'',
    })
    
    const handleClickButton = () => {
       newRequestSchema.validate(formdata)
      .then(() => createNewRequest(formdata))
      .then(onClose)
      .catch(error => alert(error))
  }

    const handleInputValue = (e:ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formdata,
        [name]: value,
      });
    };


  return (
    <form className="modal">
      <h2>Новая заявка</h2>
      <TextInput name="companyName" value={formdata.companyName} label="Фирма клиента" onChange={handleInputValue} />
      <TextInput name="driverPhoneNumber" value={formdata.driverPhoneNumber} label="Телефон" onChange={handleInputValue}/>
      <TextInput name="driverName" value={formdata.driverName} label="ФИО перевозчика" onChange={handleInputValue}/>
      <TextInput name="commentary" value={formdata.commentary} label="Комментарий" onChange={handleInputValue}/>
      <TextInput name="atiCode" value={formdata.atiCode} label="Код ATI" onChange={handleInputValue}/>
      <Button children='Сохранить' onClick={() => handleClickButton()}/>
    </form>
  );
};

