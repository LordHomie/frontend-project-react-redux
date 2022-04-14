import sortIcon from "../../../assets/sort_icon.png";

const TableHeaderComponent = (props) => {
  return (
    <th className={props.className}>
      {props.title}{" "}
      <img
        onClick={props.onClick}
        style={{
          cursor: props.cursor,
        }}
        src={sortIcon}
        alt={props.alt}
      />
    </th>
  );
};

export default TableHeaderComponent;
