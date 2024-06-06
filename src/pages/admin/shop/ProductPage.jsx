/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userNavigation } from "../../../features/user/userSlice";
import { Button, Card } from "flowbite-react";
import { CiCirclePlus } from "react-icons/ci";
import { AddProductComponent } from "../../../components";

const ProductPage = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userNavigation({
        current_parent: "toko",
        link: "/shop",
        active_page: "produk",
      })
    );
  }, []);

  return (
    <>
      {addProduct ? (
        <AddProductComponent
          editProduct={editProduct}
          setAddProduct={setAddProduct}
          setEditProduct={setEditProduct}
        />
      ) : (
        <article>
          <div className="p-4">
            <Card className="">
              <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                Produk
              </h5>
              <hr />
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setAddProduct(true)}
                  size={"xs"}
                  gradientDuoTone="purpleToBlue"
                >
                  <CiCirclePlus />
                  Tambah Produk
                </Button>
              </div>
              {/* <CityTable is_loading={is_loading} cities={cities} /> */}
            </Card>
          </div>
        </article>
      )}
    </>
  );
};
export default ProductPage;
