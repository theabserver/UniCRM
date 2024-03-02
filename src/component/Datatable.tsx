import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import ContentCreate from "@mui/icons-material/Create";
import ActionDelete from "@mui/icons-material/Delete";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import { grey, green, common } from "@mui/material/colors";
import { Container, Tooltip, Typography, Box } from "@mui/material";

const grey500 = grey["500"];
const green400 = green["400"];
const white = common.white;

const styles = {
  searchButton: {
    marginRight: 20,
  },
  editButton: {
    marginRight: "1em",
    color: white,
    backgroundColor: green400,
  },
  editButtonIcon: {
    fill: white,
  },
  deleteButton: {
    color: "grey",
    fill: grey500,
  },
  columns: {
    width10: {
      width: "10%",
    },
  },
  row: {
    margin: "1.5em",
    width: "95%",
  },
  pagination: {
    width: 350,
    margin: "0 auto",
    paddingTop: 10,
  },
};

interface DataTableProps {
  model: string;
  model_plural: string;
  items: { [key: string]: any }[];
  headers: string[];
  dataKeys: string[];
  onDelete?: (_event: React.ChangeEvent<unknown>, id?: number) => void;
}

// TODO: Fix extra width
function DataTable<DataTableProps>({
  model, // used to navigate to the correct model page
  items = [],
  dataKeys,
  headers,
  onDelete = null,
}) {
  const itemsPerPage = 10;
  const getPageCount = () => Math.ceil(items.length / itemsPerPage);

  const [data, setData] = useState(items.slice(0, itemsPerPage)); // TODO:setData for filtering
  const [page, setPage] = useState(1);
  const getItemStart = () => (page - 1) * itemsPerPage + 1;
  const getItemRange = useCallback(() => {
    return `${getItemStart()} - ${getItemStart() + itemsPerPage - 1}`;
  }, [page, items.length]);
  const getTotalPages: number = useMemo(() => {
    return getPageCount();
  }, [items]);
  const onPageChange = (e, pageTo) => {
    const startIndex = (pageTo - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData(items.slice(startIndex, endIndex));
    setPage(Math.ceil(endIndex / 10));
  };

  useEffect(() => {
    console.log(items.length);
  });
  const renderData = (dataKey: string, data: any) => {
    if (dataKey === "actions") {
      return (
        <>
          <Tooltip title="Edit" aria-label="edit">
            <Fab size="small" style={styles.editButton}>
              <ContentCreate />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete" aria-label="delete">
            <Fab
              size="small"
              style={styles.deleteButton}
              value={data.id}
              onClick={(e) => onDelete && onDelete(e, data.id)}
            >
              <ActionDelete />
            </Fab>
          </Tooltip>
        </>
      );
    } else {
      if (dataKey.includes(".")) {
        const keys = dataKey.split(".");

        return <>{data[keys[0]][keys[1]]}</>;
      } else return <>{data[dataKey]}</>;
    }
  };

  const headerCount = headers.length;

  return (
    <>
      <Box>
        <Typography component="p" gutterBottom sx={{ fontSize: "0.8rem" }}>
          Displaying {model}: {getItemRange()} record(s)
        </Typography>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.length > 0 &&
              headers.map((header) => (
                <TableCell
                  key={header}
                  component="th"
                  style={styles.columns.width10}
                >
                  {header}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                {headers &&
                  dataKeys.map((dataKey) => (
                    <TableCell
                      key={dataKey}
                      component="th"
                      style={styles.columns.width10}
                    >
                      {renderData(dataKey, item)}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headerCount}>
                <p style={{ textAlign: "center" }}>No Data Found !</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {data.length > 0 && (
        <Container style={styles.pagination}>
          <Pagination
            // size="small"
            count={getTotalPages}
            page={page}
            variant="outlined"
            color="primary"
            onChange={onPageChange}
          />
        </Container>
      )}
    </>
  );
}

export default DataTable;
