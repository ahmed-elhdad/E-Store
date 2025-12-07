import React from "react";

const User_Dashboard = () => {
  const forms = [{ for: "add" }],
    add_prudoct_fields = [
      { type: "file", label: "upload images" },
      { type: "text", label: "title" },
      { type: "select", label: "category" },
      { type: "number", label: "price" },
    ];
  const handleAddPrudoct = async () => {};
  return (
    <div>
      {forms.map((form, index) => {
        <form
          onSubmit={form.for == "add" ? handleAddPrudoct : handleAddPrudoct}
        >
          {forms.for == "add" &&
            add_prudoct_fields.map((field, index) => {
              <div>
                <label htmlFor={field.name}>{field.label}</label>
                <input type={field.type} name={field.name} />
              </div>;
            })}
        </form>;
      })}
    </div>
  );
};

export default User_Dashboard;
