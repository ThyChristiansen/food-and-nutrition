import React from "react";
import PaymentKeepTrackTableDetail from "./PaymentTrackerTableDetail";

import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = (theme) => ({
  totalRow: {
    fontWeight: "bold",
  },
});

const PaymentKeepTrackTable = (props) => {
  const { classes } = props;
  let total = props.paymentReducer.reduce(
    (a, b) => a + (b["amount"] || 0),
    0
  );

  return (
    <TableContainer component={Paper}>
      <div className="calendar">{props.renderHeader}</div>
      <Table size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Note</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.paymentReducer.map((data) => {
            return (
              <PaymentKeepTrackTableDetail
                data={data}
                currentMonth={props.currentMonth}
                key={data.id}
              />
            );
          })}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2} className={classes.totalRow}>
              Subtotal
            </TableCell>
            <TableCell align="right" className={classes.totalRow}>
              ${total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withStyles(useStyles)(PaymentKeepTrackTable);
