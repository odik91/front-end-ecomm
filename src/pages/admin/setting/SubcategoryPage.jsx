/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userNavigation } from "../../../features/user/userSlice";
import { getSubcategory } from "../../../features/subcategory/subcategorySlice";
import { Loading, SubcategoryTable } from "../../../components";
import { Card } from "flowbite-react";

const SubcategoryPage = () => {
  const { is_loading, subcategories } = useSelector(
    (store) => store.subcategories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userNavigation({
        current_parent: "pengaturan",
        link: "/setting",
        active_page: "subkategori",
      })
    );

    dispatch(getSubcategory());
  }, []);

  return (
    <>
      {is_loading ? (
        <Loading />
      ) : (
        // <ContentLoading />
        <article>
          <div className="p-4">
            <Card href="#" className="">
              <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                subkategori
              </h5>
              <hr />
              <SubcategoryTable
                subcategories={subcategories}
                is_loading={is_loading}
              />
            </Card>
          </div>
        </article>
      )}
    </>
  );
};
export default SubcategoryPage;
