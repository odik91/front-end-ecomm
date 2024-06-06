/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes, { bool } from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getProvince } from "../../features/province/provinceSlice";
import { logoutUser } from "../../features/user/userSlice";
import {
  addCity,
  deleteCity,
  getCity,
  updateCity,
} from "../../features/city/citySlice";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "flowbite-react";
import { CiCirclePlus } from "react-icons/ci";
import { Box, IconButton, Tooltip } from "@mui/material";
import { MRT_Localization_ID } from "material-react-table/locales/id";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const CityTable = ({ is_loading, cities }) => {
  const [listCities, setListCities] = useState(cities);
  const [selectProvinces, setSelectProvinces] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const dispatch = useDispatch();

  const city_type = ["Kabupaten", "Kota"];

  const fetchListProvinces = async () => {
    try {
      const response = await dispatch(getProvince());
      const dataProvinces = response.payload;
      const provinceOptions = dataProvinces.map((province) => ({
        value: province.id,
        label: province.province,
      }));
      setSelectProvinces(provinceOptions);
    } catch (error) {
      if (error.status === 401) {
        dispatch(logoutUser());
        return;
      }
      console.error("Error fetching province:", error);
    }
  };

  useEffect(() => {
    fetchListProvinces();
    dispatch(getCity()).then((response) => {
      setListCities(response.payload.data);
      setRowCount(response.payload.total);
    });
  }, []);

  useEffect(() => {
    let data = {
      province: "",
      type: "",
      city: "",
      general: "",
      page: pagination.pageIndex,
      page_size: pagination.pageSize,
    };

    if (columnFilters.length > 0) {
      columnFilters.forEach((item) => {
        data = {
          ...data,
          province: item.id === "province_id" ? item.value : "",
          type: item.id === "type" ? item.value : "",
          city: item.id === "city" ? item.value : "",
          global: globalFilter,
        };
      });
    }

    if (globalFilter !== "") {
      data = {
        ...data,
        province: '',
        type: '',
        city: '',
        global: globalFilter,
        page: pagination.pageIndex,
        page_size: pagination.pageSize,
      };
    }

    dispatch(getCity(data)).then((response) => {
      setListCities(response.payload.data);
      setRowCount(response.payload.total);
    });
  }, [
    columnFilters,
    globalFilter,
    sorting,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "province_id",
        header: "Provinsi",
        Cell: ({ cell }) => <p>{cell.row.original.province}</p>,
        editVariant: "select",
        editSelectOptions: selectProvinces,
        muiEditTextFieldProps: ({ row }) => {
          return {
            type: "text",
            required: true,
            error: !!validationErrors?.province_id,
            helperText: validationErrors?.province_id,
            label: row._valuesCache.province || row.original.province,
            onFocus: () => {
              setValidationErrors({
                ...validationErrors,
                province_id: undefined,
              });
            },
          };
        },
      },
      {
        accessorKey: "type",
        header: "Tipe",
        editVariant: "select",
        editSelectOptions: city_type,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type,
        },
      },
      {
        accessorKey: "city",
        header: "Kabupaten Kota",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.city,
          helperText: validationErrors?.city,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              city: undefined,
            }),
        },
      },
    ],
    [validationErrors, selectProvinces]
  );

  const refresh = () => {
    try {
      dispatch(getCity()).then((response) => {
        setListCities(response.payload);
      });
    } catch (error) {
      console.error("Error get cities:", error);
    }
  };

  const handleAddCity = async ({ values, table }) => {
    const newValidationErrors = validateCity(values);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});

    try {
      await dispatch(addCity(values));
      table.setCreatingRow(null);
      refresh();
    } catch (error) {
      console.error("Error adding cities:", error);
    }
  };

  const handleUpdateCity = async ({ values, table, row }) => {
    const newValidationErrors = validateCity(values);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});

    const data = { ...values, id: row.id };

    try {
      await dispatch(updateCity(data));
      table.setEditingRow(null);
      refresh();
    } catch (error) {
      console.error("Error update cities:", error);
    }
  };

  const openDeleteModalConfirmation = (row) => {
    const { id, city } = row.original;

    Swal.fire({
      title: "Perhatian!",
      html: `Apakah ingin menghapus<br><b>${city}</b>`,
      icon: "warning",
      confirmButtonText: "Hapus",
      showCancelButton: true,
      cancelButtonText: "Batal",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteCity(id));
          refresh();
        } catch (error) {
          console.error("Error delete:", error);
        }
      }
    });
  };

  const validateRequired = (value) => !!value.length;

  const validateCity = (value) => {
    return {
      province_id: value.province_id === "" ? "Mohon pilih provinsi" : "",
      type: !validateRequired(value.type) ? "Mohon pilih type" : "",
      city: !validateRequired(value.city) ? "Mohon isi kabupaten kota" : "",
    };
  };

  const table = useMaterialReactTable({
    columns,
    data: listCities,
    enableRowNumbers: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    localization: MRT_Localization_ID,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    initialState: { showColumnFilters: false },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",

          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddCity,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateCity,
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
        <CiCirclePlus /> Tambah Kabupaten Kota
      </Button>
    ),
    state: {
      isLoading: is_loading,
      showProgressBars: is_loading,
      columnFilters,
      globalFilter,
      pagination,
      showAlertBanner: isError,
      sorting,
    },
  });

  return <MaterialReactTable table={table} />;
};

CityTable.propTypes = {
  cities: PropTypes.array,
  is_loading: bool,
  cell: PropTypes.object,
};

export default CityTable;
