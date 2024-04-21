import { number, object, string, } from "yup";

const newRequestSchema = object().shape({
  companyName: string().required("Имя компании не указано"),
  driverPhoneNumber: string().required("Телефон не указан"),
  driverName: string().required("Имя перевозчика не указано"),
  atiCode: number().required("код ATI не указан"),
  commentary: string().max(30)
});


const filterRequestSchema = object().shape({
  requestId: string().matches(/^[0-9]+$/, "Номер заявки состоит из цифр")
  .max(5, 'Номер заявки не более 5 цифр')
})

const editRequestSchema = object().shape({
  atiCode: number()
})



export  {newRequestSchema, filterRequestSchema, editRequestSchema}