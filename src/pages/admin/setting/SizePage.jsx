/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { getSize } from "../../../features/size/sizeSlice";
import { userNavigation } from "../../../features/user/userSlice";
import { useEffect } from "react";
import { Loading, SizeTable } from "../../../components";
import { Card } from "flowbite-react";

const SizePage = () => {
  const { is_loading, sizes } = useSelector((store) => store.sizes);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      userNavigation({
        current_parent: "pengaturan",
        link: "/setting",
        active_page: "ukuran",
      })
    );

    dispatch(getSize());
  }, []);

  return (
    <>
      {is_loading ? (
        <Loading />
      ) : (
        <article>
          <div className="p-4">
            <Card href="#" className="">
              <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                Ukuran
              </h5>
              <hr />
              <SizeTable is_loading={is_loading} sizes={sizes} />
            </Card>
          </div>
        </article>
      )}
    </>
  );
};
export default SizePage;
