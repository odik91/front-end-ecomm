/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategory } from "../../features/category/categorySlice";
import { clearLocalStorage } from "../../features/user/userSlice";
import {
  addSubcategory,
  deleteSubcategory,
  getSubcategory,
  updateSubcategory,
} from "../../features/subcategory/subcategorySlice";
import Swal from "sweetalert2";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ID } from "material-react-table/locales/id";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "flowbite-react";
import { CiCirclePlus } from "react-icons/ci";

const SubcategoryTable = ({ subcategories, is_loading }) => {
  const [listSubcategories, setListSubcategories] = useState(subcategories);
  const [selectCategories, setSelectCategories] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  const fetchListCategories = async () => {
    try {
      const response = await dispatch(getCategory());
      const dataCategories = response.payload.data;
      const categoryOptions = dataCategories.map((category) => ({
        value: category.id,
        label: category.category,
      }));
      setSelectCategories(categoryOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchListCategories();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "category_id",
        header: "Kategori",
        Cell: ({ cell }) => {
          return <p>{cell.row.original.category}</p>;
        },
        editVariant: "select",
        editSelectOptions: selectCategories,
        muiEditTextFieldProps: ({ row }) => {
          return {
            type: "text",
            required: true,
            error: !!validationErrors?.category_id,
            helperText: validationErrors?.category_id,
            label: row._valuesCache.category || row.original.category,
            onFocus: () => {
              setValidationErrors({
                ...validationErrors,
                category_id: undefined,
              });
            },
          };
        },
      },
      {
        accessorKey: "subcategory",
        header: "Subkategori",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.subcategory,
          helperText: validationErrors?.subcategory,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              subcategory: undefined,
            }),
        },
      },
    ],
    [validationErrors, selectCategories]
  );

  const refresh = () => {
    try {
      dispatch(getSubcategory()).then((response) => {
        setListSubcategories(response.payload);
        setLocalLoading(false);
      });
    } catch (error) {
      if (error.status === 401) {
        dispatch(clearLocalStorage());
      }
    }
  };

  const handleAddSubcategory = async ({ values, table }) => {
    const newValidationErrors = validateSubcategory(values);
    
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});

    try {
      await dispatch(addSubcategory(values));
      table.setCreatingRow(null);
      refresh();
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleUpdateSubcategory = async ({ values, table, row }) => {
    const newValidationErrors = validateSubcategory(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    const data = { ...values, id: row.id };

    try {
      await dispatch(updateSubcategory(data));
      table.setEditingRow(null);
      refresh();
    } catch (error) {
      console.error("Error update subcategory:", error);
    }
  };

  const openDeleteModalConfirmation = (row) => {
    const { id, subcategory } = row.original;

    Swal.fire({
      title: "Perhatian!",
      html: `Apakah ingin menghapus<br><b>${subcategory}</b>`,
      icon: "warning",
      confirmButtonText: "Hapus",
      showCancelButton: true,
      cancelButtonText: "Batal",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteSubcategory(id));
          refresh();
        } catch (error) {
          console.error("Error delete:", error);
        }
      }
    });
  };

  const validateRequired = (value) => !!value.length;

  const validateSubcategory = (value) => {
    return {
      category_id: value.category_id === "" ? "Mohon pilih kategori" : "",
      subcategory: !validateRequired(value.subcategory)
        ? "Mohon isi subkategori"
        : "",
    };
  };

  const table = useMaterialReactTable({
    columns,
    data: listSubcategories,
    enableRowNumbers: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    localization: MRT_Localization_ID,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddSubcategory,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateSubcategory,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => openDeleteModalConfirmation(row)}>
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
        <CiCirclePlus /> Tambah Subkategori
      </Button>
    ),
    state: {
      isLoading: localLoading,
      showProgressBars: is_loading,
    },
  });

  return <MaterialReactTable table={table} />;
};

SubcategoryTable.propTypes = {
  subcategories: PropTypes.array,
  is_loading: PropTypes.bool,
  cell: PropTypes.object,
};

export default SubcategoryTable;
