/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userNavigation } from "../../../features/user/userSlice";
import { getUnit } from "../../../features/unit/unitSlice";
import { Loading, UnitTable } from "../../../components";
import { Card } from "flowbite-react";

const UnitPage = () => {
  const { is_loading, units } = useSelector((store) => store.units);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      userNavigation({
        current_parent: "pengaturan",
        link: "/setting",
        active_page: "satuan",
      })
    );

    dispatch(getUnit());
  }, [])

  return (
    <>
      {is_loading ? (
        <Loading />
      ) : (
        <article>
          <div className="p-4">
            <Card href="#" className="">
              <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                Satuan
              </h5>
              <hr />
              <UnitTable is_loading={is_loading} units={units} />
            </Card>
          </div>
        </article>
      )}
    </>
  );
};
export default UnitPage;
