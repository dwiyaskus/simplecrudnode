import React from "react";
import { Header } from "semantic-ui-react";

const showingPagination = (props) => {
  return (
    <div style={{ margin: "auto" }}>
      {props.pagedData && props.pagedData.length > 1 && (
        <Header as="h5">
          {`Showing ${props.numbersFrom} to ${props.numbersTo} of ${props.data.length}`}
        </Header>
      )}
    </div>
  );
};
export default showingPagination;
