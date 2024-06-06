/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Button, Card, FileInput, Label, TextInput } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { getCategory } from "../../features/category/categorySlice";
import { getSubcategory } from "../../features/subcategory/subcategorySlice";
import { getUnit } from "../../features/unit/unitSlice";
import { getSize } from "../../features/size/sizeSlice";
import { getColor } from "../../features/color/colorSlice";
import chroma from "chroma-js";
import { useDropzone } from "react-dropzone";

const initialState = {
  product: "",
  category: {
    value: "",
    label: "Pilih Kategori",
  },
  subcategory: {
    value: "",
    label: "Pilih Subkategori",
  },
  unit: {
    value: "",
    label: "Pilih Satuan",
  },
  size: [],
  color: [],
  images: [],
  description: "",
  discount: 0,
  price: 0,
  weight: 0,
  active: "T",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};


const AddProductComponent = ({
  editProduct,
  setAddProduct,
  setEditProduct,
}) => {
  const [values, setValues] = useState(initialState);
  const [selectCategories, setSelectCategories] = useState([]);
  const [selectSubcategories, setSelectSubcategories] = useState([]);
  const [selectUnit, setSelectUnit] = useState([]);
  const [selectSize, setSelectSize] = useState([]);
  const [selectColor, setSelectColor] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [previewImage, setPreviewImage] = useState([])
  const [images, setImages] = useState([]);

  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSelectChangeCategory = (e) => {
    const name = "category";
    const value = e.value;
    const label = e.label;
    setValues({
      ...values,
      [name]: {
        value,
        label,
      },
      subcategory: initialState.subcategory,
    });
    setCurrentCategory(value);
  };

  const handleSelectChange = (e, input_name) => {
    const value = e.value;
    const label = e.label;
    setValues({
      ...values,
      [input_name]: {
        value,
        label,
      },
    });
  };

  const handleSelectMultiple = (e, input_name) => {
    setValues({
      ...values,
      [input_name]: e,
    });
  };

  const handleInputMultipleImages = (e) => {
    const selectedFiles = [];
    const uploadedImages = []
    const targetFiles = e.target.files
    const targetedFilesObject = [...targetFiles]
    targetedFilesObject.map((file) => {
      return (selectedFiles.push(URL.createObjectURL(file)), uploadedImages.push(file))
    })
    setPreviewImage(selectedFiles);
    setValues({
      ...values,
      images: uploadedImages,
    });
  }  

  const handleImageReorder = (startIndex, endIndex) => {
    const newImages = [...images];
    const [removed] = newImages.splice(startIndex, 1);
    newImages.splice(endIndex, 0, removed);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit form");
  };

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

  const fetchListSubcategories = async () => {
    if (currentCategory) {
      try {
        const response = await dispatch(
          getSubcategory({ category: currentCategory })
        );
        const dataSubcategories = response.payload;
        const subcategoryOptions = dataSubcategories.map((subcategory) => ({
          value: subcategory.id,
          label: subcategory.subcategory,
        }));
        setSelectSubcategories(subcategoryOptions);
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      }
    }
  };

  const fetchListUnits = async () => {
    try {
      const response = await dispatch(getUnit());
      const dataUnits = response.payload;
      const unitOptions = dataUnits.map((unit) => ({
        value: unit.id,
        label: `${unit.unit} (${unit.abbrevation})`,
      }));
      setSelectUnit(unitOptions);
    } catch (error) {
      console.error("Error fetching unit:", error);
    }
  };

  const fetchSizes = async () => {
    try {
      const response = await dispatch(getSize());
      const dataSize = response.payload;
      const sizeOptions = dataSize.map((size) => ({
        value: size.id,
        label: `${size.size}`,
      }));
      setSelectSize(sizeOptions);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await dispatch(getColor());
      const dataColor = response.payload;
      const colorOptions = dataColor.map((color) => ({
        value: color.id,
        label: `${color.color}`,
        color: `${color.color_code}`,
      }));
      setSelectColor(colorOptions);
    } catch (error) {
      console.error("Error fetching color:", error);
    }
  };

  useEffect(() => {
    fetchListCategories();
    fetchListUnits();
    fetchSizes();
    fetchColors();
  }, []);

  useEffect(() => {
    fetchListSubcategories();
  }, [currentCategory]);

  // config style select multi color
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  // console.log(values);

  return (
    <article className="p-4">
      <Card>
        <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
          {editProduct ? "Edit Produk" : "Tambah Produk"}
        </h5>
        <hr />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setAddProduct(false)}
            size={"xs"}
            gradientDuoTone="purpleToBlue"
          >
            Batal
          </Button>
        </div>
        <form
          className="flex max-w-full flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-3 gap-4">
            {/* product */}
            <div className="">
              <Label value={"Produk"} />
            </div>
            <div className="col-span-2">
              <TextInput
                sizing="md"
                type={"text"}
                placeholder={"Nama Produk"}
                name={"product"}
                value={values.product}
                className={`input input-bordered w-full`}
                onChange={handleChange}
                required={true}
                autoComplete="off"
              />
            </div>

            {/* category */}
            <div className="">
              <Label value={"Kategori"} />
            </div>
            <div className="col-span-2">
              <Select
                options={selectCategories}
                name={"catetgory"}
                onChange={handleSelectChangeCategory}
                value={{
                  value: values.category.value,
                  label: values.category.label,
                }}
              />
            </div>

            {/* subcategory */}
            <div className="">
              <Label value={"Subkategori"} />
            </div>
            <div className="col-span-2">
              <Select
                options={selectSubcategories}
                name={"subcategory"}
                onChange={(e) => handleSelectChange(e, "subcategory")}
                value={{
                  value: values.subcategory.value,
                  label: values.subcategory.label,
                }}
              />
            </div>

            {/* unit */}
            <div className="">
              <Label value={"Satuan"} />
            </div>
            <div className="col-span-2">
              <Select
                options={selectUnit}
                name={"unit"}
                onChange={(e) => handleSelectChange(e, "unit")}
                value={{
                  value: values.unit.value,
                  label: values.unit.label,
                }}
              />
            </div>

            {/* size */}
            <div className="">
              <Label value={"Ukuran"} />
            </div>
            <div className="col-span-2">
              <Select
                options={selectSize}
                name={"size"}
                isMulti
                onChange={(e) => handleSelectMultiple(e, "size")}
                value={values.size}
              />
            </div>

            {/* color */}
            <div className="">
              <Label value={"Warna"} />
            </div>
            <div className="col-span-2">
              <Select
                options={selectColor}
                name={"color"}
                isMulti
                onChange={(e) => handleSelectMultiple(e, "color")}
                value={values.color}
                styles={colourStyles}
              />
            </div>

            {/* upload multiple files */}
            <div className="">
              <Label htmlFor="multiple_files" value={"Gambar (multiple)"} />
            </div>
            <div className="col-span-2">
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files"
                type="file"
                multiple
                name="image"
                accept="image/*"
                onChange={handleInputMultipleImages}
              />
            </div>

            {/* <div>
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                    }}
                  />
                  <button onClick={() => handleImageDelete(index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div> */}

            <section className="container">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <aside style={thumbsContainer}>{thumbs}</aside>
            </section>
          </div>
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Batal
          </Button>
        </form>
      </Card>
    </article>
  );
};

AddProductComponent.propTypes = {
  editProduct: PropTypes.bool,
  setAddProduct: PropTypes.func,
  setEditProduct: PropTypes.func,
};

export default AddProductComponent;
