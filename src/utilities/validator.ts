import { number, object, string } from "yup";

const newRequestSchema = object().shape({
  companyName: string().required("Имя компании не указано"),
  driverPhoneNumber: string().required("Телефон не указан"),
  driverName: string().required("Имя перевозчика не указано"),
  atiCode: number().required("код ATI не указан"),
  commentary: string().max(30)
});


// const editRequestSchema = object().shape()({
//   companyName: string(),
//   driverPhoneNumber: string(),
//   driverName: string(),
//   atiCode: number(),
//   commentary: string().max(30)
// })


export  {newRequestSchema}