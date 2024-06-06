/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { clearLocalStorage } from "../../features/user/userSlice";
import { addSize, deleteSize, getSize, updateSize } from "../../features/size/sizeSlice";
import Swal from "sweetalert2";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_ID } from "material-react-table/locales/id";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "flowbite-react";
import { CiCirclePlus } from "react-icons/ci";

const SizeTable = ({ is_loading, sizes }) => {
  const [listSizes, setListSizes] = useState(sizes);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "size",
        header: "Ukuran",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.size,
          helperText: validationErrors?.size,
          onFocus: () => {
            setValidationErrors({
              ...validationErrors,
              size: undefined,
            });
          },
        },
      },
    ],
    [validationErrors]
  );

  const refresh = () => {
    try {
      dispatch(getSize()).then((response) => {
        setListSizes(response.payload);
      });
    } catch (error) {
      if (error.status === 401) {
        dispatch(clearLocalStorage());
      }
    }
  };

  const handleAddSize = async ({ values, table }) => {
    const newValidationErrors = validateSize(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    await dispatch(addSize(values));
    table.setCreatingRow(null);
    refresh();
  };

  const handleUpdateSize = async ({ values, table, row }) => {
    const newValidationErrors = validateSize(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    const data = { ...values, id: row.id };

    await dispatch(updateSize(data));
    table.setEditingRow(null);
    refresh();
  };

  const openDeleteModalConfirmation = (row) => {
    const {id, size} = row.original

    Swal.fire({
      title: "Perhatian!",
      html: `Apakah ingin menghapus<br><b>${size}</b>`,
      icon: "warning",
      confirmButtonText: "Hapus",
      showCancelButton: true,
      cancelButtonText: "Batal",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteSize(id));
          refresh();
        } catch (error) {
          console.error("Error delete:", error);
        }
      }
    });
  }

  const validateRequired = (value) => !!value.length;

  const validateSize = (values) => {
    return {
      size: !validateRequired(values.size) ? "Mohon isi warna" : "",
    };
  };

  const table = useMaterialReactTable({
    columns,
    data: listSizes,
    enableRowNumbers: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    localization: MRT_Localization_ID,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddSize,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateSize,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => openDeleteModalConfirmation(row)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        size={"xs"}
        gradientDuoTone={"purpleToBlue"}
        pill
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        <CiCirclePlus /> Tambah Ukuran
      </Button>
    ),
    state: {
      isLoading: is_loading,
      showProgressBars: is_loading,
    },
  });

  return <MaterialReactTable table={table} />;
};

SizeTable.propTypes = {
  sizes: PropTypes.array,
  is_loading: PropTypes.bool,
  cell: PropTypes.object,
};

export default SizeTable;
