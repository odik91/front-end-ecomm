/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userNavigation } from "../../../features/user/userSlice";
import { CityTable, Loading } from "../../../components";
import { Card } from "flowbite-react";

const CityPage = () => {
  const { is_loading, cities } = useSelector((store) => store.cities);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      userNavigation({
        current_parent: "pengaturan",
        link: "/setting",
        active_page: "kabupaten-kota",
      })
    );
  }, []);
  return (
    // <>
    //   {is_loading ? (
    //     <Loading />
    //   ) : (
    //     <article>
    //       <div className="p-4">
    //         <Card href="#" className="">
    //           <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
    //             Kabupaten Kota
    //           </h5>
    //           <hr />
    //           <CityTable is_loading={is_loading} cities={cities} />
    //         </Card>
    //       </div>
    //     </article>
    //   )}
    // </>
    <article>
      <div className="p-4">
        <Card href="#" className="">
          <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
            Kabupaten Kota
          </h5>
          <hr />
          <CityTable is_loading={is_loading} cities={cities} />
        </Card>
      </div>
    </article>
  );
};
export default CityPage;
