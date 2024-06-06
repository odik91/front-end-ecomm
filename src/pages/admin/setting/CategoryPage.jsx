/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userNavigation } from "../../../features/user/userSlice";
import { getCategory } from "../../../features/category/categorySlice";
import Swal from "sweetalert2";
import { Card } from "flowbite-react";
import { CategoryTable, ContentLoading, Loading } from "../../../components";

const CategoryPage = () => {
  const {
    is_loading,
    categories,
    is_error,
    error_message,
    is_success,
    success_message,
  } = useSelector((store) => store.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userNavigation({
        current_parent: "pengaturan",
        link: "#",
        active_page: "kategori",
      })
    );

    dispatch(getCategory());
  }, []);

  useEffect(() => {
    if (is_success) {
      Swal.fire({
        title: `Berhasil`,
        html: success_message,
        icon: "success",
      });
    }

    if (is_error) {
      Swal.fire({
        title: "Perhatian!",
        html: error_message,
        icon: "error",
      });
    }
  }, [is_error, error_message, is_success, success_message]);

  return (
    <>
      {is_loading ? (
        <Loading />
      ) : (
        // <ContentLoading />
        <article>
          <div className="p-4">
            <Card href="#" className="">
              <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                Kategori
              </h5>
              <hr />
              <CategoryTable />
            </Card>
          </div>
        </article>
      )}
    </>
  );
};
export default CategoryPage;
