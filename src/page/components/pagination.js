import React from "react";
import { Grid, Pagination } from "semantic-ui-react";
import ShowingDataLabel from "./showingPagination";
const pagination = (props) => {
  return (
    <Grid verticalAlign="middle" style={{ width: "100%", padding: "1em" }}>
      <Grid.Row>
        <Grid.Column width={6}>
          <ShowingDataLabel
            pagedData={props.pagedData}
            numbersTo={props.numbersTo}
            numbersFrom={props.numbersFrom}
            data={props.data}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          {props.pagedData && props.pagedData.length > 1 && (
            <Pagination
              totalPages={props.pagedData.length}
              onPageChange={props.pageChange}
              activePage={props.activePage}
              floated="right"
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default pagination;
