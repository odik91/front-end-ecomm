/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addColor,
  deleteColor,
  getColor,
  updateColor,
} from "../../features/color/colorSlice";
import { clearLocalStorage } from "../../features/user/userSlice";
import Swal from "sweetalert2";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_ID } from "material-react-table/locales/id";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "flowbite-react";
import { CiCirclePlus } from "react-icons/ci";

const ColorTable = ({ is_loading, colors }) => {
  const [listColor, setListColor] = useState(colors);
  const [localLoading, setLocalLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "color",
        header: "Warna",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.color,
          helperText: validationErrors?.color,
          onFocus: () => {
            setValidationErrors({
              ...validationErrors,
              color: undefined,
            });
          },
        },
      },
      {
        accessorKey: "color_code",
        header: "Kode Warna",
        Cell: ({cell}) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: cell.getValue(),
                  width: "15px",
                  height: "15px",
                  margin: "0px 5px",
                }}
              ></div>{" "}
              {cell.getValue()}
            </div>
          );
        },
        muiEditTextFieldProps: {
          type: "color",
          required: true,
          error: !!validationErrors?.color_code,
          helperText: validationErrors?.color_code,
          onFocus: () => {
            setValidationErrors({
              ...validationErrors,
              color: undefined,
            });
          },
        },
      },
    ],
    [validationErrors]
  );

  const refresh = () => {
    try {
      dispatch(getColor()).then((response) => {
        setListColor(response.payload);
      });
    } catch (error) {
      if (error.status === 401) {
        dispatch(clearLocalStorage());
      }
    }
  };

  const handleAddColor = async ({ values, table }) => {
    const newValidationErrors = validateColor(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    await dispatch(addColor(values));
    table.setCreatingRow(null);
    refresh();
  };

  const handleUpdateColor = async ({ values, table, row }) => {
    const newValidationErrors = validateColor(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    const data = { ...values, id: row.id };

    await dispatch(updateColor(data));
    table.setEditingRow(null);
    refresh();
  };

  const openDeleteModalConfirmation = (row) => {
    const { id, color } = row.original;

    Swal.fire({
      title: "Perhatian!",
      html: `Apakah ingin menghapus<br><b>${color}</b>`,
      icon: "warning",
      confirmButtonText: "Hapus",
      showCancelButton: true,
      cancelButtonText: "Batal",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteColor(id));
          refresh();
        } catch (error) {
          console.error("Error delete:", error);
        }
      }
    });
  };

  const validateRequired = (value) => !!value.length;

  const validateColor = (values) => {
    return {
      color: !validateRequired(values.color) ? "Mohon isi warna" : "",
      color_code: !validateRequired(values.color_code) ? "Mohon isi kode warna" : "",
    };
  };

  const table = useMaterialReactTable({
    columns,
    data: listColor,
    enableRowNumbers: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    localization: MRT_Localization_ID,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddColor,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateColor,
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
        <CiCirclePlus /> Tambah Warna
      </Button>
    ),
    state: {
      isLoading: localLoading,
      showProgressBars: is_loading,
    },
  });

  return <MaterialReactTable table={table} />
};

ColorTable.propTypes = {
  colors: PropTypes.array,
  is_loading: PropTypes.bool,
  cell: PropTypes.object,
};

export default ColorTable;
