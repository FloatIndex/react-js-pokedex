import { Select, Input, Button } from "semantic-ui-react";

const selectOptions = [
  { text: "All", value: "all" },
  { text: "Caught", value: "caught" },
  { text: "Not caught", value: "not-caught" },
];

function FiltersBar({ onGroupByChange, onSearchChange, onUpdateAll }) {
  return (
    <div id="filters-bar">
      <Select
        options={selectOptions}
        defaultValue="all"
        closeOnChange
        onChange={(_e, data) => {
          onGroupByChange(data.value);
        }}
      />

      <Input
        placeholder="Search..."
        onChange={(_e, data) => onSearchChange(data.value)}
      />

      <Button onClick={() => onUpdateAll("catch")}>Catch 'em all</Button>
      <Button onClick={() => onUpdateAll("release")}>Release 'em all</Button>
    </div>
  );
}

export default FiltersBar;
