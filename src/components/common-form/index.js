import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function CommonForm({
  action,
  buttonText,
  isBtnDisabled,
  formControls,
  btnType,
  formData,
  setFormData,
  handleFileChange,
}) {
  function renderInputByComponentType(getCurrentControl) {
    let content = null;
    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );
        break;

        case "file":
          content = (
            <Label
              htmlFor={getCurrentControl.name}
              className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounder-lg cursor-pointer"
            >
              <h2>{getCurrentControl.label}</h2>
              <Input
                type="file"
                onChange={handleFileChange}
                id={getCurrentControl.name}
                name={getCurrentControl.name}
              />
            </Label>
          );
          break;

      default:
        content = (
            <div className="relative flex items-center mt-8">
              <Input
                type="text"
                disabled={getCurrentControl.disabled}
                placeholder={getCurrentControl.placeholder}
                name={getCurrentControl.name}
                id={getCurrentControl.name}
                value={formData[getCurrentControl.name]}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-full rounded h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          );
        break;
    }
    return content;
  }

  return (
    <form action={action}>
      {formControls.map((control) => renderInputByComponentType(control))}
      <div className="mt-6 w-full -z-10">
        <Button
          type={btnType || "submit"}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5 mt-6"
          disabled={isBtnDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default CommonForm;
