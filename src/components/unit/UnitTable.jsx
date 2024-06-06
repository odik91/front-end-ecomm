/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addUnit, deleteUnit, getUnit, updateUnit } from "../../features/unit/unitSlice";
import { clearLocalStorage, logoutUser } from "../../features/user/userSlice";
import Swal from "sweetalert2";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_ID } from "material-react-table/locales/id";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "flowbite-react";
import { CiCirclePlus } from "react-icons/ci";

const UnitTable = ({ is_loading, units }) => {
  const [listUnits, setListUnits] = useState(units);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "unit",
        header: "Satuan",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.unit,
          helperText: validationErrors?.unit,
          onFocus: () => {
            setValidationErrors({
              ...validationErrors,
              unit: undefined,
            });
          },
        },
      },
      {
        accessorKey: "abbrevation",
        header: "Singkatan",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.abbrevation,
          helperText: validationErrors?.abbrevation,
          onFocus: () => {
            setValidationErrors({
              ...validationErrors,
              abbrevation: undefined,
            });
          },
        },
      },
    ],
    [validationErrors]
  );

  const refresh = () => {
    try {
      dispatch(getUnit()).then((response) => {
        setListUnits(response.payload);
      });
    } catch (error) {
      if (error.status === 401) {
        dispatch(logoutUser());
      }
    }
  };

  const handleAddUnit = async ({ values, table }) => {
    const newValidationErrors = validateUnit(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});

    await dispatch(addUnit(values));
    table.setCreatingRow(null);
    refresh();
  };

  const handleUpdateUnit = async ({ values, table, row }) => {
    const newValidationErrors = validateUnit(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});

    const data = { ...values, id: row.id };

    await dispatch(updateUnit(data));
    table.setEditingRow(null);
    refresh();
  };

  const openDeleteModalConfirmation = (row) => {
    const { id, unit } = row.original;

    Swal.fire({
      title: "Perhatian!",
      html: `Apakah ingin menghapus<br><b>${unit}</b>`,
      icon: "warning",
      confirmButtonText: "Hapus",
      showCancelButton: true,
      cancelButtonText: "Batal",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteUnit(id));
          refresh();
        } catch (error) {
          console.error("Error delete:", error);
        }
      }
    });
  };

  const validateRequired = (value) => !!value.length;

  const validateUnit = (values) => {
    return {
      unit: !validateRequired(values.unit) ? "Mohon isi ukuran" : "",
      abbrevation: !validateRequired(values.abbrevation) ? "Mohon isi singkatan" : "",
    };
  };

  const table = useMaterialReactTable({
    columns,
    data: listUnits,
    enableRowNumbers: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    localization: MRT_Localization_ID,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddUnit,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateUnit,
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
        <CiCirclePlus /> Tambah Satuan
      </Button>
    ),
    state: {
      isLoading: is_loading,
      showProgressBars: is_loading,
    },
  });

  return <MaterialReactTable table={table} />;
};

UnitTable.propTypes = {
  units: PropTypes.array,
  is_loading: PropTypes.bool,
  cell: PropTypes.object,
};

export default UnitTable;
