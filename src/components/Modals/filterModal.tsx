import { useState, useMemo, useCallback } from "react";
import { TextInput, Button, Select, Label } from "@gravity-ui/uikit";
import { RangeCalendar, RangeValue } from "@gravity-ui/date-components";
import type { DateTime } from "@gravity-ui/date-utils";
import "./modal.scss";
import { TRequest } from "../../utilities/types";
import { dateFormatter } from "../../utilities/dateFormatter";

type Option = {
  value: string;
  content: string;
};

export type FilterSet = {
  requestId?: number;
  companyName?: string;
  driverName?: string;
  status?: string;
  atiCode?: string;
  createdAt?: {
    start: Date;
    end: Date;
  };
};

const removeDuplicateOptions = (array: Option[]) => {
  return [...new Map(array.map((item) => [item["value"], item])).values()];
};

export const FilterModal = ({
  requests,
  onFilterChanged,
}: {
  requests: TRequest[];
  onFilterChanged: (filter: FilterSet) => void;
}) => {
  const [filter, setFilter] = useState<FilterSet>();

  const options = useMemo(() => {
    const dates: Option[] = [];
    const companies: Option[] = [];
    const statuses: Option[] = [];
    const atiCodes: Option[] = [];
    const drivers: Option[] = [];

    requests.forEach((r) => {
      dates.push({
        value: dateFormatter.format(new Date(r.createdAt)),
        content: r.createdAt,
      });
      companies.push({
        value: r.companyName,
        content: r.companyName,
      });
      statuses.push({
        value: r.requestStatus,
        content: r.requestStatus,
      });
      atiCodes.push({
        value: r.atiCode,
        content: r.atiCode,
      });
      drivers.push({
        value: r.driverName,
        content: r.driverName,
      });
    });

    return {
      dates: removeDuplicateOptions(dates),
      companies: removeDuplicateOptions(companies),
      statuses: removeDuplicateOptions(statuses),
      atiCodes: removeDuplicateOptions(atiCodes),
      drivers: removeDuplicateOptions(drivers),
    };
  }, [requests]);

  const getHandleSelectFilterChange = useCallback(
    (key: keyof FilterSet) => {
      return (values: string[]) => {
        setFilter({
          ...filter,
          [key]: values[0],
        });
      };
    },
    [filter, setFilter]
  );

  const handleRequestIdChanged = useCallback(
    (id: number) => {
      if (id > 0) {
        setFilter({
          ...filter,
          requestId: id,
        });
      }
    },
    [filter, setFilter]
  );

  const handleCreatedAtFilterChanged = useCallback(
    (start: Date, end: Date) => {
      setFilter({
        ...filter,
        createdAt: {
          start,
          end,
        },
      });
    },
    [filter, setFilter]
  );

  const onFilterApply = useCallback(() => {
    if (filter) {
      onFilterChanged(filter);
    }
  }, [filter, onFilterChanged]);

  const handleFilterClear = useCallback(() => {
    setFilter({});
    onFilterChanged({});
  }, [onFilterApply]);

  return (
    <div className="modal">
      <span>Номер заявки</span>
      <TextInput
        placeholder="Введите номер заявки"
        onChange={(evt) => {
          // TODO: need validation of number
          const eventValue = evt.target.value;
          const id = Number.parseInt(eventValue);
          handleRequestIdChanged(id);
        }}
      />

      <span>Дата получения</span>
      <RangeCalendar
        onUpdate={(evt: RangeValue<DateTime>) =>
          handleCreatedAtFilterChanged(evt.start.toDate(), evt.end.toDate())
        }
      />

      <span>Фирма клиента</span>
      <Select
        value={[filter?.companyName ?? ""]}
        options={options.companies}
        onUpdate={getHandleSelectFilterChange("companyName")}
      />

      <span>ФИО Перевозчика</span>
      <Select
        value={[filter?.driverName ?? ""]}
        options={options.drivers}
        onUpdate={getHandleSelectFilterChange("driverName")}
      />

      <span>Статус заявки</span>
      <Select
        options={options.statuses}
        value={[filter?.status ?? ""]}
        onUpdate={getHandleSelectFilterChange("status")}
      />

      <span>Код ATI</span>
      <Select
        options={options.atiCodes}
        value={[filter?.atiCode ?? ""]}
        onUpdate={getHandleSelectFilterChange("atiCode")}
      />

      <Button onClick={onFilterApply}>Применить</Button>
      <Button onClick={handleFilterClear}>Сбросить фильтры</Button>
    </div>
  );
};
