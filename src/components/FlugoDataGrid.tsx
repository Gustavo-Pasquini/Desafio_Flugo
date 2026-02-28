import { DataGrid, GridColDef } from '@mui/x-data-grid';

type FlugoDataGridProps = {
  columns: GridColDef[];
  rows: any[];
  setSelectedRows: React.Dispatch<React.SetStateAction<any>>;
};

const FlugoDataGrid = ({columns, rows, setSelectedRows}: FlugoDataGridProps) => {
  return (
    <DataGrid
      autoHeight={false}
      rows={rows}
      columns={columns}
      hideFooterSelectedRowCount
      disableColumnMenu
      disableRowSelectionOnClick
      disableColumnResize
      checkboxSelection
      onRowSelectionModelChange={(selection) => {
        if (Array.isArray(selection.ids)) {
          setSelectedRows(selection.ids);
        } else if (selection.ids instanceof Set) {
          setSelectedRows(Array.from(selection.ids));
        } else {
          setSelectedRows([]);
        }
      }}
      sx={{
        background: '#fff',
        border: 'none',
        fontSize: 16,
        '& .MuiDataGrid-columnHeaders': { background: '#b5b5b5', fontWeight: 700, fontSize: 16 },
        '& .MuiDataGrid-row': { background: '#fff', borderBottom: '1px solid #f3f4f6' },
        '& .MuiDataGrid-cell': { color: '#222' },
        '& .MuiDataGrid-footerContainer': { background: '#fff' },
        '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700 },
        '& .MuiAvatar-root': { boxShadow: 1 },
      }}
      density="comfortable"
      pageSizeOptions={[100]}
      initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
    />
   );
};

export default FlugoDataGrid;
