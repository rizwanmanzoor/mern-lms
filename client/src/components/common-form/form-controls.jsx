import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function FormControls({ formControls = [], formData, setFormData }) {
  function renderComponentByType(getcontroleItem) {
    let element = null;
    const currentControleItemValue = formData[getcontroleItem.name] || "";

    switch (getcontroleItem.componentType) {
      case "input":
        element = (
          <Input
            id={getcontroleItem.name}
            name={getcontroleItem.name}
            placeholder={getcontroleItem.placeholder}
            type={getcontroleItem.type}
            value={currentControleItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontroleItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getcontroleItem.name]: value,
              })
            }
            value={currentControleItemValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontroleItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getcontroleItem.options && getcontroleItem.options.length > 0
                ? getcontroleItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            id={getcontroleItem.name}
            name={getcontroleItem.name}
            placeholder={getcontroleItem.placeholder}
            value={currentControleItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontroleItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            id={getcontroleItem.name}
            name={getcontroleItem.name}
            placeholder={getcontroleItem.placeholder}
            type={getcontroleItem.type}
            value={currentControleItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontroleItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controleItem) => (
        <div key={controleItem.name}>
          <Label htmlFor={controleItem.name}>{controleItem.label}</Label>
          {renderComponentByType(controleItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
