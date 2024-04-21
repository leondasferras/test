export type TRequest = {
  id: string;
  createdAt: string;
  companyName: string;
  driverName: string;
  driverPhoneNumber: string;
  commentary: string;
  requestStatus: string;
  atiCode: string;
};

export type TNewRequest = {
  companyName: string;
  driverName: string;
  driverPhoneNumber: string;
  commentary?: string;
  atiCode: string;
};

export type GetRequestsByFilterRequest = {
  companyName?: string;
  driverName?: string;
  atiCode?: string;
  status?: string;
  createdAt?: {
    start: Date,
    end: Date
  };
};

export type TableColumns = {
  id: string;
  name: string;
};

export const tableColumnsNames = {
  id: "Номер заявки",
  createdAt: "Дата получения",
  companyName: "Фирма клиента",
  driverName: "ФИО перевозчика",
  driverPhoneNumber: "Контактный телефон перевозчика",
  commentary: "Комментарий",
  requestStatus: "Статус заявки",
  atiCode: "Код ATI",
};

export const atiCodesSelector = [
  { value: "новая", content: "новая" },
  { value: "в работе", content: "в работе" },
  { value: "завершена", content: "завершена" },
];