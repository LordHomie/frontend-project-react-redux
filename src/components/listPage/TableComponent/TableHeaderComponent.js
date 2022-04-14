const TableHeaderComponent = (props) => {
  return (
    <th className={props.className}>
      {props.title}{" "}
      <img
        onClick={props.onClick}
        style={{
          cursor: "pointer",
        }}
        src={props.sortIcon}
        alt={props.alt}
      />
    </th>
  );
};

export default TableHeaderComponent;
