/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { getProvince } from "../../../features/province/provinceSlice";
import { userNavigation } from "../../../features/user/userSlice";
import { useEffect } from "react";
import { Loading, ProvinceTable } from "../../../components";
import { Card } from "flowbite-react";

const ProvincePage = () => {
  const { is_loading, provinces } = useSelector((store) => store.provinces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userNavigation({
        current_parent: "pengaturan",
        link: "/setting",
        active_page: "provinsi",
      })
    );

    dispatch(getProvince());
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
                Provinsi
              </h5>
              <hr />
              <ProvinceTable is_loading={is_loading} provinces={provinces} />
            </Card>
          </div>
        </article>
      )}
    </>
  );
}
export default ProvincePage