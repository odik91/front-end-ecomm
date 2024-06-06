import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import {
  addProvince,
  deleteProvince,
  getProvince,
  updateProvince,
} from "../../features/province/provinceSlice";
import Swal from "sweetalert2";
import { MRT_Localization_ID } from "material-react-table/locales/id";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "flowbite-react";
import { CiCirclePlus } from "react-icons/ci";

const ProvinceTable = ({ is_loading, provinces }) => {
  const [listProvinces, setListProvinces] = useState(provinces);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "province",
        header: "Provinsi",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.province,
          helperText: validationErrors?.province,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              province: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  const refresh = () => {
    try {
      dispatch(getProvince()).then((response) => {
        setListProvinces(response.payload);
      });
    } catch (error) {
      if (error.status === 401) {
        dispatch(logoutUser());
      }
    }
  };

  const handleAddProvince = async ({ values, table }) => {
    const newValidationErrors = validateProvince(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});

    await dispatch(addProvince(values));
    table.setCreatingRow(null);
    refresh();
  };

  const handleUpdateProvince = async ({ values, table, row }) => {
    const newValidationErrors = validateProvince(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});

    const data = { ...values, id: row.id };
    await dispatch(updateProvince(data));
    table.setEditingRow(null);
    refresh();
  };

  const openDeleteModalConfirmation = (row) => {
    const { id, province } = row.original;

    Swal.fire({
      title: "Perhatian!",
      html: `Apakah ingin menghapus<br><b>${province}</b>`,
      icon: "warning",
      confirmButtonText: "Hapus",
      showCancelButton: true,
      cancelButtonText: "Batal",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteProvince(id));
          refresh();
        } catch (error) {
          console.error("Error delete:", error);
        }
      }
    });
  };

  const validateRequired = (value) => !!value.length;

  const validateProvince = (values) => {
    return {
      province: !validateRequired(values.province) ? "Mohon isi provinsi" : "",
    };
  };

  const table = useMaterialReactTable({
    columns,
    data: listProvinces,
    enableRowNumbers: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    localization: MRT_Localization_ID,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddProvince,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateProvince,
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
        <CiCirclePlus /> Tambah Provinsi
      </Button>
    ),
    state: {
      isLoading: is_loading,
      showProgressBars: is_loading,
    },
  });

  return <MaterialReactTable table={table} />;
};

ProvinceTable.propTypes = {
  provinces: PropTypes.array,
  is_loading: PropTypes.bool,
  cell: PropTypes.object,
};

export default ProvinceTable;
