/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../features/category/categorySlice";
import Swal from "sweetalert2";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ID } from "material-react-table/locales/id";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Button as FolowBiteButton } from "flowbite-react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { clearLocalStorage } from "../../features/user/userSlice";

const CategoryTable = () => {
  const { is_loading, categories } = useSelector((store) => store.categories);

  const [listCategories, setListCategories] = useState(categories);
  const [localLoading, setLocalLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Kategori",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.category,
          helperText: validationErrors?.category,
          onFocus: () => {
            setValidationErrors({
              ...validationErrors,
              category: undefined,
            });
          },
        },
      },
    ],
    [validationErrors]
  );

  const refresh = () => {
    try {
      dispatch(getCategory()).then((response) => {
        setListCategories(response.payload);
        setLocalLoading(false);
      });
    } catch (error) {
      if (error.status === 401) {
        dispatch(clearLocalStorage());
      }
    }
  };

  const handleAddCategory = async ({ values, table }) => {
    const { category } = values;
    const newValidationErrors = validateCategory(category);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    await dispatch(addCategory(values));
    table.setCreatingRow(null);
    refresh();
  };

  const handleUpdateCategory = async ({ values, table, row }) => {
    const { category } = values;
    const newValidationErrors = validateCategory(category);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    const data = { ...values, id: row.id };

    await dispatch(updateCategory(data));
    table.setEditingRow(null);
    refresh();
  };

  const openDeleteModalConfirmModal = (row) => {
    const { id, category } = row.original;

    Swal.fire({
      title: "Perhatian!",
      html: `Apakah ingin menghapus<br><b>${category}</b>`,
      icon: "warning",
      confirmButtonText: "Hapus",
      showCancelButton: true,
      cancelButtonText: "Batal",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteCategory(id));
          refresh();
        } catch (error) {
          console.error("Error delete:", error);
        }
      }
    });
  };

  const validateRequired = (value) => !!value.length;

  const validateCategory = (category) => {
    return {
      category: !validateRequired(category) ? "Mohon isi kategori" : "",
    };
  };

  const table = useMaterialReactTable({
    columns,
    data: listCategories,
    enableRowNumbers: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    localization: MRT_Localization_ID,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddCategory,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateCategory,
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
            onClick={() => openDeleteModalConfirmModal(row)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        {/* <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true);
          }}
          size="small"
          color="success"
        >
          Tambah Kategori
        </Button> */}
        <FolowBiteButton
          size="xs"
          gradientDuoTone="purpleToBlue"
          pill
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          Tambah Kategori
        </FolowBiteButton>
      </>
    ),
    state: {
      isLoading: localLoading,
      showProgressBars: is_loading,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CategoryTable;
