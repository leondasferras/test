import "./modal.scss";
import { tableColumnsNames, TRequest } from "../../utilities/types";

export const ShowRequestModal = ({ request }: { request:TRequest }) => {
  return (
    <div className="modal">
      <h2>Заявка № {request.id}</h2>
      {Object.keys(request).map((field, i) => {
        return (
          <p key={i}>
            {tableColumnsNames[field]}: <span> {request[field]}</span>
          </p>
        );
      })}
    </div>
  );
};
